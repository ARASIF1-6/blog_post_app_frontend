export default function Dashboard(){
  const token = localStorage.getItem("token");
  if (!token) return <p className="text-center mt-20">Unauthorized</p>;
  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">You can create, update and delete posts here.</p>
    </div>
  );
}
