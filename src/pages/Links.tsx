
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAllLinks, 
  getLinksByFolder,
  getAllFolders, 
  type Link as LinkType,
  type Folder,
  addLink
} from "@/services/LinkService";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LinkCard } from "@/components/LinkCard";
import { FolderList } from "@/components/FolderList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Link } from "lucide-react";

const Links = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState("all");
  const [linkUrl, setLinkUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.error("로그인이 필요한 페이지입니다");
      navigate("/login");
      return;
    }

    // Load folders and links
    loadFolders();
    loadLinks();
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Reload links when selected folder changes
    loadLinks();
  }, [selectedFolderId]);

  const loadFolders = () => {
    const folderData = getAllFolders();
    setFolders(folderData);
  };

  const loadLinks = () => {
    const linkData = selectedFolderId === "all" 
      ? getAllLinks() 
      : getLinksByFolder(selectedFolderId);
    setLinks(linkData);
  };

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  const handleAddLink = async () => {
    if (!linkUrl) {
      toast.error("URL을 입력해주세요");
      return;
    }

    try {
      setIsLoading(true);
      await addLink(linkUrl, selectedFolderId);
      setLinkUrl("");
      loadLinks();
      if (linkInputRef.current) {
        linkInputRef.current.focus();
      }
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("링크 추가에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddLink();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9ff]">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">나의 링크</h1>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Link size={20} />
              </div>
              <Input 
                ref={linkInputRef}
                className="pl-10 pr-28 py-6"
                placeholder="링크를 추가해 보세요"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 gradient-btn"
                onClick={handleAddLink}
                disabled={isLoading || !linkUrl}
                size="sm"
              >
                {isLoading ? "추가 중..." : "추가하기"}
              </Button>
            </div>
          </div>
        </div>
        
        <FolderList 
          folders={folders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={handleSelectFolder}
          onFoldersChange={loadFolders}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {links.length > 0 ? (
            links.map((link) => (
              <LinkCard 
                key={link.id} 
                link={link} 
                onUpdate={loadLinks} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 mb-4">저장된 링크가 없습니다.</p>
              <p className="text-gray-400">위 입력창에 URL을 입력하여 링크를 추가해보세요.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Links;
