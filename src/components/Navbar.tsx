import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavDesktop from "./client/NavDesktop";
import NavMobile from "./client/NavMobile";
import Image from "next/legacy/image";

const Navbar = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <div className="sticky top-0 z-[30] bg-white">
      <div className="w-full  top-4 md:flex hidden px-20 py-3 border border-b items-center">
        <div className=" w-full flex justify-between items-center gap-8">
          <div className="flex-[1] flex justify-start gap-4 items-center w">
              <Image src={"/images/logo.png"} alt="logo" width={48} height={48}/>
          </div>
          <NavDesktop />

          <div className="flex-[1] flex justify-end">
            {session && session?.user ? (
              <div className="relative flex items-center justify-between gap-4 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Image
                    src={session && (session.user.image as string)}
                    alt=""
                    width={28}
                    height={28}
                    layout="intrinsic"
                    className="rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  <Link href={"/dashboard"} className="text-blue-600 underline">
                    {session.user.name?.split(" ")[0]}
                  </Link>
                </div>

                <form action={handleSignOut}>
                  <Button type="submit">Logout</Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-2 py-3 md:hidden flex relative justify-between items-center gap-4 border border-b">
        <div className=" flex gap-2 justify-start items-center w-full">
          <Image src={"/images/logo.png"} alt="logo" width={44} height={44} />
          <input
            type="text"
            placeholder="search"
            className="border border-gray-300 p-[6px] text-sm rounded-sm focus:outline-none w-full"
          />
        </div>
        <NavMobile />
      </div>
    </div>
  );
};

export default Navbar;
