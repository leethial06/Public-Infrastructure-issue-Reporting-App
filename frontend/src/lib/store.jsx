import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { StoreContext } from "./StoreContext";

import { STATUSES } from "./civic";

const KEY = "civicreport.state.v1";


const seed = () => {
  const now = Date.now();

  const iso = (days) =>
    new Date(now - days * 86400000).toISOString();

  return [
    {
      id: "CR-1042",
      category: "Pothole",
      description:
        "Deep pothole near the bus stop causing two-wheelers to swerve into traffic.",
      address: "MG Road, near Central Bus Stop",
      priority: "High",
      status: "In Progress",
      createdAt: iso(6),
      upvotes: 3,

      updates: [
        {
          status: "Submitted",
          at: iso(6),
          note: "Complaint received.",
        },
        {
          status: "In Review",
          at: iso(5),
          note: "Assigned to Roads division.",
        },
        {
          status: "In Progress",
          at: iso(2),
          note: "Repair crew scheduled.",
        },
      ],
    },

    {
      id: "CR-1038",
      category: "Street Light",
      description:
        "Three street lights out for over a week on the park stretch.",
      address: "Lake View Park, East Gate",
      priority: "Medium",
      status: "Resolved",
      createdAt: iso(14),
      upvotes: 7,

      updates: [
        {
          status: "Submitted",
          at: iso(14),
          note: "Complaint received.",
        },
        {
          status: "In Review",
          at: iso(13),
          note: "Verified by field officer.",
        },
        {
          status: "In Progress",
          at: iso(10),
          note: "Lamps replaced.",
        },
        {
          status: "Resolved",
          at: iso(8),
          note: "Lighting restored. Thanks for reporting!",
        },
      ],
    },

    {
      id: "CR-1051",
      category: "Garbage",
      description:
        "Waste pile not collected for four days behind the market lane.",
      address: "Market Lane 4, Sector 12",
      priority: "Low",
      status: "Submitted",
      createdAt: iso(1),
      upvotes: 1,

      updates: [
        {
          status: "Submitted",
          at: iso(1),
          note: "Complaint received.",
        },
      ],
    },
  ];
};

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);

      if (raw) {
        const savedState = JSON.parse(raw);

        return {
          user: savedState.user || null,
          complaints: savedState.complaints || [],
        };
      }

      return {
        user: null,
        complaints: seed(),
      };
    } catch {
      return {
        user: null,
        complaints: seed(),
      };
    }
  });

  const [ready] = useState(true);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,

      ready,

      /* Login */
      login: (user) => {
        setState((s) => ({
          ...s,
          user,
        }));
      },

      /* Logout */
      logout: () => {
        setState((s) => ({
          ...s,
          user: null,
        }));
      },

      /* Update Profile */
      updateUser: (patch) => {
        setState((s) => ({
          ...s,
          user: s.user
            ? { ...s.user, ...patch }
            : s.user,
        }));
      },

      /* Add Complaint */
      addComplaint: (complaint) => {
        setState((s) => ({
          ...s,
          complaints: [
            {
              ...complaint,
              upvotes: complaint.upvotes || 0,
            },
            ...s.complaints,
          ],
        }));
      },

      /* Upvote Complaint */
      upvoteComplaint: (id) => {
        setState((s) => ({
          ...s,

          complaints: s.complaints.map((complaint) => {
            if (complaint.id !== id) {
              return complaint;
            }

            return {
              ...complaint,
              upvotes: (complaint.upvotes || 0) + 1,
            };
          }),
        }));
      },
      /* Refresh Complaints from Backend */
refreshComplaints: async () => {
  try {
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");

    if (!token) {
      console.log("Access token not found");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/complaints/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseText = await response.text();

    console.log(
      "Complaints API status:",
      response.status
    );

    console.log(
      "Complaints API response:",
      responseText
    );

    if (!response.ok) {
      console.log(
        "Failed to fetch complaints:",
        response.status
      );
      return;
    }

    const data = JSON.parse(responseText);

    const backendComplaints = Array.isArray(data)
      ? data
      : data.results || [];

    const statusMap = {
      pending: "Pending",
      in_progress: "In Progress",
      resolved: "Resolved",
      rejected: "Rejected",
    };

    const formattedComplaints = backendComplaints.map(
      (complaint) => ({
        id: complaint.id,
        category: complaint.category,
        description: complaint.description,
        address: complaint.address,
        latitude: complaint.latitude,
        longitude: complaint.longitude,
        lat: complaint.latitude
          ? Number(complaint.latitude)
          : null,
        lng: complaint.longitude
          ? Number(complaint.longitude)
          : null,
        priority: complaint.priority,
        status:
          statusMap[complaint.status] ||
          complaint.status,
        created_at: complaint.created_at,
        createdAt: complaint.created_at,
        upvotes: 0,
        updates: [],
      })
    );

    setState((s) => ({
      ...s,
      complaints: formattedComplaints,
    }));

    console.log(
      "Complaints loaded:",
      formattedComplaints
    );
  } catch (error) {
    console.error(
      "Error refreshing complaints:",
      error
    );
  }
},
      
      /* Change Complaint Status */
      advance: (id) => {
        setState((s) => ({
          ...s,
          complaints: s.complaints.map((complaint) => {
            if (complaint.id !== id) {
              return complaint;
            }

            const currentIndex =
              STATUSES.indexOf(complaint.status);

            const nextIndex = Math.min(
              currentIndex + 1,
              STATUSES.length - 1
            );

            const nextStatus = STATUSES[nextIndex];

            if (nextStatus === complaint.status) {
              return complaint;
            }

            return {
              ...complaint,
              status: nextStatus,
              updates: [
                ...(complaint.updates || []),
                {
                  status: nextStatus,
                  at: new Date().toISOString(),
                  note: `Status moved to ${nextStatus}.`,
                },
              ],
            };
          }),
        }));
      },
    }),
    [state, ready]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

      