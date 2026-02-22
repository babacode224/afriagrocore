import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function EmailAnalytics() {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: queueStats, isLoading: queueLoading } = trpc.emailAnalytics.getQueueStats.useQuery(undefined, {
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: deliveryStats, isLoading: deliveryLoading } = trpc.emailAnalytics.getDeliveryStats.useQuery({});

  const { data: healthMetrics, isLoading: healthLoading } = trpc.emailAnalytics.getHealthMetrics.useQuery(undefined, {
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const { data: recentLogs, isLoading: logsLoading } = trpc.emailAnalytics.getRecentLogs.useQuery({ limit: 20 });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Email Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Real-time monitoring of email delivery and queue performance
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Health Alert */}
        {healthMetrics?.alert && (
          <Card className="mb-6 p-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                  {healthMetrics.alert.level.toUpperCase()} ALERT
                </h3>
                <p className="text-orange-800 dark:text-orange-200 text-sm mt-1">
                  {healthMetrics.alert.message}
                </p>
                <p className="text-orange-600 dark:text-orange-400 text-xs mt-2">
                  {new Date(healthMetrics.alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Queue Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total in Queue</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {queueLoading ? '...' : queueStats?.queue.total || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {queueLoading ? '...' : queueStats?.queue.pending || 0}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Processing</p>
                <p className="text-3xl font-bold text-blue-600">
                  {queueLoading ? '...' : queueStats?.queue.processing || 0}
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Failed</p>
                <p className="text-3xl font-bold text-red-600">
                  {queueLoading ? '...' : queueStats?.queue.failed || 0}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
        </div>

        {/* Delivery Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Delivery Statistics (Last 30 Days)
            </h2>
            {deliveryLoading ? (
              <p className="text-slate-600 dark:text-slate-400">Loading...</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <span className="text-slate-700 dark:text-slate-300">Total Submissions</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {deliveryStats?.total || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-green-700 dark:text-green-300">Success Rate</span>
                  <span className="text-2xl font-bold text-green-600">
                    {deliveryStats?.successRate || 0}%
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">By Status</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
                      <p className="text-sm text-blue-700 dark:text-blue-300">New</p>
                      <p className="text-xl font-bold text-blue-600">{deliveryStats?.byStatus.new || 0}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-center">
                      <p className="text-sm text-green-700 dark:text-green-300">Contacted</p>
                      <p className="text-xl font-bold text-green-600">{deliveryStats?.byStatus.contacted || 0}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded text-center">
                      <p className="text-sm text-slate-700 dark:text-slate-300">Closed</p>
                      <p className="text-xl font-bold text-slate-600">{deliveryStats?.byStatus.closed || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              By User Role
            </h2>
            {deliveryLoading ? (
              <p className="text-slate-600 dark:text-slate-400">Loading...</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">Farmers</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-600">
                    {deliveryStats?.byRole.farmer || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">Partners</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {deliveryStats?.byRole.partner || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">Investors</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {deliveryStats?.byRole.investor || 0}
                  </span>
                </div>

                <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Follow-up Emails</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Sent</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {deliveryStats?.followUp.sent || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Pending</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {deliveryStats?.followUp.pending || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Rate</span>
                      <span className="font-semibold text-green-600">
                        {deliveryStats?.followUp.rate || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Recent Logs */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Recent Submissions
          </h2>
          {logsLoading ? (
            <p className="text-slate-600 dark:text-slate-400">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Submitted</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs?.map((log) => (
                    <tr key={log.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">{log.name}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{log.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.role === 'farmer' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          log.role === 'partner' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}>
                          {log.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.status === 'contacted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          log.status === 'closed' ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(log.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {log.followUpSentAt ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
