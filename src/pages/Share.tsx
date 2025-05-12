
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { getAllFolders, addLink, type Folder } from "@/services/LinkService";
import { toast } from "sonner";

const Share = () => {
  const [url, setUrl] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.error("로그인이 필요한 페이지입니다");
      navigate("/login");
      return;
    }

    // Load folders
    const folderData = getAllFolders();
    setFolders(folderData);
  }, [isLoggedIn, navigate]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("URL을 입력해주세요");
      return;
    }
    
    // Add http:// prefix if not present
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    
    if (!isValidUrl(normalizedUrl)) {
      toast.error("유효한 URL을 입력해주세요");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await addLink(normalizedUrl, selectedFolderId);
      navigate("/links");
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("링크 추가에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">링크 추가하기</h1>
          <p className="text-gray-600 mt-2">저장하고 싶은 웹사이트 URL을 입력하세요</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="folder" className="block text-sm font-medium text-gray-700 mb-1">
                폴더
              </label>
              <Select
                value={selectedFolderId}
                onValueChange={setSelectedFolderId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="폴더 선택" />
                </SelectTrigger>
                <SelectContent>
                  {folders.map(folder => (
                    <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gradient-btn py-6" 
              disabled={isLoading}
            >
              {isLoading ? "추가 중..." : "추가하기"}
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Share;
