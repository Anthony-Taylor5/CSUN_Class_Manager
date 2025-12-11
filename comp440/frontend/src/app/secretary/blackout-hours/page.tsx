
import { blackoutHours, classrooms } from "@/lib/placeholder-data";

export default function BlackoutHoursPage() {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Blackout Hours</h1>
          <p className="text-muted-foreground">
            Manage periods when classrooms are unavailable.
          </p>
        </div>
        <button className="p-2 bg-blue-500 text-white rounded">
          Add Blackout
        </button>
      </div>

      <div className="border rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Scheduled Blackouts</h2>
          <p className="text-sm text-muted-foreground">
            A list of all classroom blackout periods.
          </p>
        </div>
        <div className="p-6 pt-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Classroom</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Time Slot</th>
                <th className="text-left p-4">Reason</th>
                <th className="p-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {blackoutHours.map((blackout) => (
                <tr key={blackout.id} className="border-b">
                  <td className="p-4 font-medium">
                    {classrooms.find((c) => c.id === blackout.classroomId)?.name}
                  </td>
                  <td className="p-4">{formatDate(blackout.startTime)}</td>
                  <td className="p-4">
                    {formatTime(blackout.startTime)} -{" "}
                    {formatTime(blackout.endTime)}
                  </td>
                  <td className="p-4">{blackout.reason}</td>
                  <td className="p-4 flex gap-2 justify-end">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
