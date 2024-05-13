import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SignOut} from "@/app/_components/sign.button";

type Props = {
  image: string | null
  name?: string
}

export const ProfileImage = ({image, name}:Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {
          image
            ? <img className="rounded-[50%]" src={image} alt="user avatar" width={24} height={24} referrerPolicy="no-referrer"/>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"/>
            </svg>
        }

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {/*<DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>*/}
        {/*<DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>*/}
        {/*<DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>*/}
        {/*<DropdownMenuSeparator/>*/}
        <DropdownMenuItem className="cursor-pointer">
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}