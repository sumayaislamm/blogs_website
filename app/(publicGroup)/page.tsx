import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
export default async function Home() {

  const user = await getMe();

  console.log(user)
  return (
    <div>
      Hello Sumu!
      <Button
      size={"xs"}
      
      > Click </Button>
    </div>
  );
}
