
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavbarProps {
  showAuthButtons?: boolean;
}

export const Navbar = ({ showAuthButtons = true }: NavbarProps) => {
  const { isLoggedIn, currentUser, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between w-full p-4 md:px-6 lg:px-8">
      <Link to="/" className="text-linkbrary-blue text-2xl font-bold">
        Linkbrary
      </Link>
      
      <div className="flex items-center gap-4">
        {showAuthButtons && (
          isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/links">
                <Button className="gradient-btn px-4 py-2">
                  링크 추가하기
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-linkbrary-blue text-white">
                      {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/links" className="w-full">
                      나의 링크
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-linkbrary-blue text-linkbrary-blue">
                로그인
              </Button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};
