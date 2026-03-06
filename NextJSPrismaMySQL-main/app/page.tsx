import UsersClient from "@/app/components/UsersClient";
import UsersClientComplete from "./components/UserClientComplete";
import PostPage from "./components/PostPage";

export default function HomePage() {
  return (
    <main>
      <h1>หน้าแรก</h1>
      <UsersClientComplete />
      <hr className="my-8" />
      <PostPage />
    </main>
  );
}