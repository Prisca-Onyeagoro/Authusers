export default function UserProfile({ params }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>User Profile</p>
      <span className="bg-red-900 text-3xl  rounded-lg">{params.id}</span>
    </div>
  );
}
