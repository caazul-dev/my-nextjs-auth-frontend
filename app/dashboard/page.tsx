"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { clearTokens, isAuthenticated } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import {
  LogOut,
  RefreshCw,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

interface Position {
  position_id: number;
  position_code: string;
  position_name: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Create form state (POST)
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Single item details state (GET /:id)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  // Update form state (PUT /:id)
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [editCode, setEditCode] = useState<string>("");
  const [editName, setEditName] = useState<string>("");

  // GET all positions
  const fetchPositions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient<Position[]>(CONFIG.ENDPOINTS.POSITIONS, {
        method: "GET",
        requiresAuth: true,
      });
      setPositions(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load positions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(CONFIG.ROUTES.LOGIN);
      return;
    }
    fetchPositions();
  }, [router]);

  // GET single position by ID
  const handleViewPosition = async (id: number) => {
    try {
      setError(null);
      const data = await apiClient<Position>(
        `${CONFIG.ENDPOINTS.POSITIONS}/${id}`,
        {
          method: "GET",
          requiresAuth: true,
        }
      );
      setSelectedPosition(data);
      setEditingPosition(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch position details.");
    }
  };

  // POST create new position
  const handleCreatePosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      await apiClient<Position>(CONFIG.ENDPOINTS.POSITIONS, {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify({
          position_code: newCode.trim(),
          position_name: newName.trim(),
        }),
      });
      setNewCode("");
      setNewName("");
      setShowCreateForm(false);
      await fetchPositions();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create position.");
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing a position
  const startEditing = (position: Position) => {
    setEditingPosition(position);
    setEditCode(position.position_code);
    setEditName(position.position_name);
    setSelectedPosition(null);
    setShowCreateForm(false);
  };

  // PUT update position
  const handleUpdatePosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPosition || !editCode.trim() || !editName.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      await apiClient<Position>(
        `${CONFIG.ENDPOINTS.POSITIONS}/${editingPosition.position_id}`,
        {
          method: "PUT",
          requiresAuth: true,
          body: JSON.stringify({
            position_code: editCode.trim(),
            position_name: editName.trim(),
          }),
        }
      );
      setEditingPosition(null);
      await fetchPositions();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update position.");
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE position
  const handleDeletePosition = async (id: number) => {
    if (!confirm(`Are you sure you want to delete Position #${id}?`)) return;

    try {
      setError(null);
      await apiClient(`${CONFIG.ENDPOINTS.POSITIONS}/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      });
      if (selectedPosition?.position_id === id) setSelectedPosition(null);
      if (editingPosition?.position_id === id) setEditingPosition(null);
      await fetchPositions();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete position.");
    }
  };

  const handleLogout = () => {
    clearTokens();
    router.replace(CONFIG.ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Manage organization positions
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Create New Position Card (POST) */}
        {showCreateForm && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Create New Position
                </h2>
                <p className="text-xs text-gray-500">
                  Fill in the details to add a new position.
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePosition} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Position Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pres"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Position Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. President"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Position"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Single Position Details Card (GET /:id) */}
        {selectedPosition && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Position Details (#{selectedPosition.position_id})
                </h2>
                <p className="text-xs text-gray-500">
                  Fetched directly from GET /positions/{selectedPosition.position_id}
                </p>
              </div>
              <button
                onClick={() => setSelectedPosition(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Position ID</p>
                <p className="font-semibold text-gray-900">
                  {selectedPosition.position_id}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Code</p>
                <p className="font-semibold text-gray-900">
                  {selectedPosition.position_code}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">
                  {selectedPosition.position_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedPosition.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Update Position Card (PUT /:id) */}
        {editingPosition && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Update Position #{editingPosition.position_id}
                </h2>
                <p className="text-xs text-gray-500">
                  Modify the position code and name below.
                </p>
              </div>
              <button
                onClick={() => setEditingPosition(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUpdatePosition} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Position Code
                  </label>
                  <input
                    type="text"
                    required
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Position Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPosition(null)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Positions Table Card (GET all) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Positions</h2>
              <p className="text-xs text-gray-500">
                A list of all positions stored in the backend.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchPositions}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Read / Refresh
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(true);
                  setEditingPosition(null);
                  setSelectedPosition(null);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                Create Position
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-medium text-gray-500">
                  <th className="pb-3 pr-4">ID</th>
                  <th className="pb-3 pr-4">Position Code</th>
                  <th className="pb-3 pr-4">Position Name</th>
                  <th className="pb-3 pr-4">Created At</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      Loading positions...
                    </td>
                  </tr>
                ) : positions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No positions found. Click &ldquo;Create Position&rdquo; to add one.
                    </td>
                  </tr>
                ) : (
                  positions.map((pos) => (
                    <tr key={pos.position_id} className="hover:bg-gray-50">
                      <td className="py-3.5 pr-4 font-medium text-gray-900">
                        {pos.position_id}
                      </td>
                      <td className="py-3.5 pr-4 text-gray-700">
                        {pos.position_code}
                      </td>
                      <td className="py-3.5 pr-4 text-gray-700">
                        {pos.position_name}
                      </td>
                      <td className="py-3.5 pr-4 text-gray-500">
                        {new Date(pos.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewPosition(pos.position_id)}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Read
                          </button>
                          <button
                            onClick={() => startEditing(pos)}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Update
                          </button>
                          <button
                            onClick={() => handleDeletePosition(pos.position_id)}
                            className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}