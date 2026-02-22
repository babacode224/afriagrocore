import { trpc } from "@/lib/trpc";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Star, Mail, Phone, Calendar, ExternalLink } from "lucide-react";

export default function FeedbackDashboard() {
  useDocumentTitle("Feedback Dashboard - AfriAgroCore");

  const { data: feedbacks, isLoading, error } = trpc.feedback.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Feedback</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800";
    if (rating >= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Feedback Dashboard</h1>
          <p className="text-slate-600">
            View all feedback submissions from your embeddable widget
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Submissions</CardDescription>
              <CardTitle className="text-3xl">{feedbacks?.length || 0}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Rating</CardDescription>
              <CardTitle className="text-3xl">
                {feedbacks && feedbacks.length > 0
                  ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
                  : "0.0"}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>5-Star Reviews</CardDescription>
              <CardTitle className="text-3xl">
                {feedbacks?.filter(f => f.rating === 5).length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Emails Sent</CardDescription>
              <CardTitle className="text-3xl">
                {feedbacks?.filter(f => f.emailSent === "yes").length || 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Feedback List */}
        <div className="space-y-6">
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{feedback.name}</CardTitle>
                        <Badge className={getRatingColor(feedback.rating)}>
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current inline" />
                          ))}
                          <span className="ml-1">{feedback.rating}/5</span>
                        </Badge>
                        {feedback.emailSent === "yes" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            ✉️ Email Sent
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${feedback.email}`} className="hover:text-emerald-600">
                            {feedback.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${feedback.phoneNumber}`} className="hover:text-emerald-600">
                            {feedback.phoneNumber}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(feedback.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="bg-slate-50 p-4 rounded-lg mb-4">
                    <p className="text-slate-700 whitespace-pre-wrap">{feedback.comment}</p>
                  </div>

                  {feedback.sourceUrl && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <ExternalLink className="w-4 h-4" />
                      <span>Source:</span>
                      <a
                        href={feedback.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline truncate max-w-md"
                      >
                        {feedback.sourceUrl}
                      </a>
                    </div>
                  )}

                  {feedback.ipAddress && (
                    <div className="text-xs text-slate-500 mt-2">
                      IP: {feedback.ipAddress}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Feedback Yet</h3>
                <p className="text-slate-600 mb-6">
                  Start collecting feedback by embedding the widget on your website
                </p>
                <div className="bg-slate-100 p-4 rounded-lg max-w-2xl mx-auto text-left">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Embed Code:</p>
                  <code className="text-sm text-slate-800 block bg-white p-3 rounded border border-slate-200">
                    {`<script src="${window.location.origin}/widget/feedback.js"></script>`}
                  </code>
                  <p className="text-xs text-slate-600 mt-2">
                    Paste this code before the closing &lt;/body&gt; tag on any webpage
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
