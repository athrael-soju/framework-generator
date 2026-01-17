'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FrameworkType = 'Foundation' | 'Pipeline' | 'Cyclical' | 'Hub';

export default function NewFrameworkWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    problemDescription: '',
    domain: '',
    constraints: [''],
    intendedUsers: [''],
    triggers: [''],
    frameworkType: 'Pipeline' as FrameworkType,
  });

  const addArrayItem = (field: 'constraints' | 'intendedUsers' | 'triggers') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const updateArrayItem = (field: 'constraints' | 'intendedUsers' | 'triggers', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item),
    }));
  };

  const removeArrayItem = (field: 'constraints' | 'intendedUsers' | 'triggers', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // First create the run
      const createRes = await fetch('/api/frameworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name }),
      });

      if (!createRes.ok) {
        throw new Error('Failed to create framework run');
      }

      const { date, name } = await createRes.json();

      // Then call the MCP frame tool
      const frameRes = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/call',
          params: {
            name: 'framework_frame',
            arguments: {
              frameworkName: name,
              problemDescription: formData.problemDescription,
              domain: formData.domain,
              constraints: formData.constraints.filter(c => c.trim()),
              intendedUsers: formData.intendedUsers.filter(u => u.trim()),
              triggers: formData.triggers.filter(t => t.trim()),
              frameworkType: formData.frameworkType,
            },
          },
        }),
      });

      if (!frameRes.ok) {
        throw new Error('Failed to execute Frame stage');
      }

      router.push(`/runs/${date}/${name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            New Framework
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Step {step} of 3
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Framework Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Content Review Process"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Problem Description
                </label>
                <textarea
                  value={formData.problemDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, problemDescription: e.target.value }))}
                  placeholder="What workflow or process needs systematizing? What's painful or inconsistent about it?"
                  rows={4}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Domain
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                  placeholder="e.g., Content Management, Software Development"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Constraints
                </label>
                {formData.constraints.map((constraint, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => updateArrayItem('constraints', index, e.target.value)}
                      placeholder="e.g., Must complete within 48 hours"
                      className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                    {formData.constraints.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('constraints', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('constraints')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Add constraint
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Intended Users
                </label>
                {formData.intendedUsers.map((user, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={user}
                      onChange={(e) => updateArrayItem('intendedUsers', index, e.target.value)}
                      placeholder="e.g., Content Team, Editors"
                      className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                    {formData.intendedUsers.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('intendedUsers', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('intendedUsers')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Add user type
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Triggers
                </label>
                {formData.triggers.map((trigger, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={trigger}
                      onChange={(e) => updateArrayItem('triggers', index, e.target.value)}
                      placeholder="e.g., New content submitted, Weekly review cycle"
                      className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                    />
                    {formData.triggers.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('triggers', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('triggers')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Add trigger
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Framework Type
                </label>
                <select
                  value={formData.frameworkType}
                  onChange={(e) => setFormData(prev => ({ ...prev, frameworkType: e.target.value as FrameworkType }))}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                >
                  <option value="Foundation">Foundation - Single assessment, run once</option>
                  <option value="Pipeline">Pipeline - Sequential stages, ongoing</option>
                  <option value="Cyclical">Cyclical - Repeating on a cadence</option>
                  <option value="Hub">Hub - Central stage others connect to</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setStep(prev => prev - 1)}
              disabled={step === 1}
              className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                onClick={() => setStep(prev => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Framework'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
