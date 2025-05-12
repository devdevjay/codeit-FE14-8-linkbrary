
import { useState } from "react";
import { Link as LinkType, deleteLink, updateLink, generateRandomColor } from "@/services/LinkService";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LinkCardProps {
  link: LinkType;
  onUpdate: () => void;
}

export const LinkCard = ({ link, onUpdate }: LinkCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedLink, setEditedLink] = useState(link);
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedDate = new Date(link.createdAt).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  
  const handleDelete = () => {
    deleteLink(link.id);
    onUpdate();
  };
  
  const handleSaveEdit = () => {
    try {
      updateLink(link.id, editedLink);
      setIsEditDialogOpen(false);
      onUpdate();
    } catch (error) {
      toast.error("링크 수정에 실패했습니다");
    }
  };
  
  const handleCardClick = () => {
    window.open(link.url, "_blank");
  };

  const randomColorClass = generateRandomColor();

  return (
    <>
      <div 
        className="relative bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="cursor-pointer flex-1 flex flex-col"
          onClick={handleCardClick}
        >
          <div className="h-40 overflow-hidden">
            {link.imageUrl ? (
              <img 
                src={link.imageUrl} 
                alt={link.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className = `w-full h-full ${randomColorClass}`;
                  }
                }}
              />
            ) : (
              <div className={`w-full h-full ${randomColorClass}`}></div>
            )}
          </div>
          
          <div className="p-4 flex-1">
            <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{link.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{link.description}</p>
            <div className="text-xs text-gray-500">{formattedDate}</div>
          </div>
        </div>
        
        <div className={`absolute top-2 right-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white bg-opacity-80 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>링크 수정하기</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="url" className="text-sm font-medium">URL</label>
              <Input
                id="url"
                value={editedLink.url}
                onChange={(e) => setEditedLink({ ...editedLink, url: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">제목</label>
              <Input
                id="title"
                value={editedLink.title}
                onChange={(e) => setEditedLink({ ...editedLink, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">설명</label>
              <Textarea
                id="description"
                value={editedLink.description}
                onChange={(e) => setEditedLink({ ...editedLink, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>취소</Button>
            <Button className="gradient-btn" onClick={handleSaveEdit}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
