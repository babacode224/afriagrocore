import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, Search, Filter, Eye, Download, 
  CheckCircle, XCircle, Clock, AlertTriangle, Send
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EmailAnalyticsFull() {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailTypeFilter, setEmailTypeFilter] = useState<'admin_notification' | 'user_confirmation' | 'follow_up' | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'sent' | 'failed' | 'all'>('all');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const { data: emailLogsData, isLoading, refetch } = trpc.emailAnalytics.getAllEmailLogs.useQuery({
    limit: 100,
    offset: 0,
    emailType: emailTypeFilter !== 'all' ? emailTypeFilter : undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  const filteredLogs = emailLogsData?.logs.filter(log => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      log.recipientEmail.toLowerCase().includes(search) ||
      log.recipientName?.toLowerCase().includes(search) ||
      log.subject.toLowerCase().includes(search)
    );
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
      case 'bounced':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'sending':
        return <Send className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'queued':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getEmailTypeLabel = (type: string) => {
    switch (type) {
      case 'admin_notification':
        return 'Admin Notification';
      case 'user_confirmation':
        return 'User Confirmation';
      case 'follow_up':
        return 'Follow-up Email';
      default:
        return type;
    }
  };

  const getEmailTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'admin_notification':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'user_confirmation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'follow_up':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewEmail = (email: any) => {
    setSelectedEmail(email);
    setShowEmailDialog(true);
  };

  const exportToCSV = () => {
    if (!filteredLogs.length) return;

    const headers = ['Date', 'Type', 'Recipient', 'Subject', 'Status', 'Role'];
    const rows = filteredLogs.map(log => [
      new Date(log.createdAt).toLocaleString(),
      getEmailTypeLabel(log.emailType),
      log.recipientEmail,
      log.subject,
      log.status,
      log.userRole || 'N/A',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Email Analytics Dashboard
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive tracking of all email activity on your platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Emails</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {emailLogsData?.total || 0}
                </p>
              </div>
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Sent Successfully</p>
                <p className="text-3xl font-bold text-green-600">
                  {filteredLogs.filter(l => l.status === 'sent').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Failed</p>
                <p className="text-3xl font-bold text-red-600">
                  {filteredLogs.filter(l => l.status === 'failed' || l.status === 'bounced').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {emailLogsData?.total ? 
                    ((filteredLogs.filter(l => l.status === 'sent').length / emailLogsData.total) * 100).toFixed(1) 
                    : 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by email, name, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={emailTypeFilter}
                onChange={(e) => setEmailTypeFilter(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600"
              >
                <option value="all">All Types</option>
                <option value="admin_notification">Admin Notifications</option>
                <option value="user_confirmation">User Confirmations</option>
                <option value="follow_up">Follow-ups</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
              </select>

              <Button onClick={exportToCSV} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>

              <Button onClick={() => refetch()} variant="outline">
                Refresh
              </Button>
            </div>
          </div>
        </Card>

        {/* Email Logs Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            All Email Activity ({filteredLogs.length} emails)
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-slate-600 dark:text-slate-400 mt-4">Loading email logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">No emails found matching your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Date/Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Recipient</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEmailTypeBadgeColor(log.emailType)}`}>
                          {getEmailTypeLabel(log.emailType)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{log.recipientName || 'N/A'}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{log.recipientEmail}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-300 max-w-xs truncate">
                        {log.subject}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="text-sm capitalize">{log.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {log.userRole ? (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 capitalize">
                            {log.userRole}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => handleViewEmail(log)}
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Email Detail Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Details</DialogTitle>
            <DialogDescription>
              Complete information about this email
            </DialogDescription>
          </DialogHeader>

          {selectedEmail && (
            <div className="space-y-4">
              {/* Email Metadata */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Email Type</p>
                  <p className="text-sm text-slate-900 dark:text-white">{getEmailTypeLabel(selectedEmail.emailType)}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedEmail.status)}
                    <span className="text-sm capitalize">{selectedEmail.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Recipient</p>
                  <p className="text-sm text-slate-900 dark:text-white">{selectedEmail.recipientName}</p>
                  <p className="text-xs text-slate-500">{selectedEmail.recipientEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sender</p>
                  <p className="text-sm text-slate-900 dark:text-white">{selectedEmail.senderEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sent At</p>
                  <p className="text-sm text-slate-900 dark:text-white">
                    {selectedEmail.sentAt ? new Date(selectedEmail.sentAt).toLocaleString() : 'Not sent yet'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">User Role</p>
                  <p className="text-sm text-slate-900 dark:text-white capitalize">{selectedEmail.userRole || 'N/A'}</p>
                </div>
                {selectedEmail.messageId && (
                  <div className="col-span-2">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Message ID</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{selectedEmail.messageId}</p>
                  </div>
                )}
              </div>

              {/* Subject */}
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Subject</p>
                <p className="text-sm text-slate-900 dark:text-white p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  {selectedEmail.subject}
                </p>
              </div>

              {/* Email Content */}
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Email Content (HTML Preview)</p>
                <div 
                  className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
                />
              </div>

              {/* Error Message (if any) */}
              {selectedEmail.errorMessage && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">Error Message</p>
                  <p className="text-sm text-red-600 dark:text-red-300">{selectedEmail.errorMessage}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
