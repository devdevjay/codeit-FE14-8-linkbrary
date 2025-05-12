
import { useState } from "react";
import { Folder, updateFolder, deleteFolder, addFolder } from "@/services/LinkService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FolderListProps {
  folders: Folder[];
  selectedFolderId: string;
  onSelectFolder: (folderId: string) => void;
  onFoldersChange: () => void;
}

export const FolderList = ({ 
  folders, 
  selectedFolderId, 
  onSelectFolder,
  onFoldersChange
}: FolderListProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName("");
      setIsAddDialogOpen(false);
      onFoldersChange();
    }
  };

  const handleEditFolder = () => {
    if (editingFolder && editingFolder.name.trim()) {
      updateFolder(editingFolder.id, editingFolder.name);
      setIsEditDialogOpen(false);
      setEditingFolder(null);
      onFoldersChange();
    }
  };

  const handleDeleteFolder = (folderId: string) => {
    if (folderId === 'all' || folderId === 'favorites') {
      return; // Prevent deletion of default folders
    }
    
    deleteFolder(folderId);
    
    if (selectedFolderId === folderId) {
      onSelectFolder('all');
    }
    
    onFoldersChange();
  };

  const openEditDialog = (folder: Folder) => {
    setEditingFolder(folder);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">폴더</h2>
        <Button 
          variant="outline" 
          className="text-sm border-gray-300" 
          onClick={() => setIsAddDialogOpen(true)}
        >
          + 폴더 추가
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {folders.map((folder) => (
          <div key={folder.id} className="relative group">
            <Button
              variant={selectedFolderId === folder.id ? "secondary" : "outline"}
              className={`text-sm ${selectedFolderId === folder.id ? 'bg-gray-200' : 'border-gray-300'}`}
              onClick={() => onSelectFolder(folder.id)}
            >
              {folder.name}
            </Button>
            
            {folder.id !== 'all' && (
              <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(folder)}>
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-500"
                      onClick={() => handleDeleteFolder(folder.id)}
                    >
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Folder Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>폴더 추가</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">폴더 이름</label>
              <Input
                id="name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="새 폴더 이름"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>취소</Button>
            <Button className="gradient-btn" onClick={handleAddFolder}>추가</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Folder Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>폴더 수정</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name" className="text-sm font-medium">폴더 이름</label>
              <Input
                id="edit-name"
                value={editingFolder?.name || ""}
                onChange={(e) => setEditingFolder(editingFolder ? { ...editingFolder, name: e.target.value } : null)}
                placeholder="폴더 이름"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>취소</Button>
            <Button className="gradient-btn" onClick={handleEditFolder}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
