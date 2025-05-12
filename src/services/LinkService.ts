import { toast } from "sonner";

export interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  folderId: string;
  createdAt: string;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
}

// Mock data for demo purposes
let folders: Folder[] = [
  { id: "all", name: "전체", createdAt: new Date().toISOString() },
  { id: "favorites", name: "유튜브", createdAt: new Date().toISOString() },
  {
    id: "work",
    name: "코드잇FE 관련자료",
    createdAt: new Date().toISOString(),
  },
  { id: "personal", name: "개발 사이트", createdAt: new Date().toISOString() },
  { id: "education", name: "유용한 글", createdAt: new Date().toISOString() },
  { id: "other", name: "AI", createdAt: new Date().toISOString() },
];

let links: Link[] = [
  {
    id: "1",
    url: "https://www.youtube.com/",
    title: "YouTube",
    description:
      "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
    imageUrl:
      "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg",
    folderId: "favorites",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    url: "https://www.naver.com/",
    title: "NAVER",
    description: "NAVER 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    imageUrl:
      "https://play-lh.googleusercontent.com/Kbu0747Cx3rpzHcSbtM1zDriGFG74zVbtkPmVnOKpmLCS59l7IuKD5M3MKbaq_nEaZM",
    folderId: "favorites",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    url: "https://www.tving.com/",
    title: "TVING",
    description: "티빙에서 다양한 영화, 드라마, 예능 프로그램을 만나보세요.",
    imageUrl:
      "https://image.tving.com/upload/pr/image/2022/08/17/091311_res.jpg",
    folderId: "favorites",
    createdAt: new Date().toISOString(),
  },
];

// Helper function to extract domain from URL
export const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch (error) {
    return url;
  }
};

// Generate random color for link card placeholders
export const generateRandomColor = (): string => {
  const colors = [
    "bg-gradient-to-br from-pink-500 to-orange-400",
    "bg-gradient-to-br from-green-400 to-blue-500",
    "bg-gradient-to-br from-purple-500 to-indigo-500",
    "bg-gradient-to-br from-yellow-400 to-orange-500",
    "bg-gradient-to-br from-blue-400 to-indigo-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Mock function to get metadata from URL
// In a real app, you'd make an API call to your backend to fetch metadata
export const getUrlMetadata = async (url: string): Promise<Partial<Link>> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Predefined responses for some common URLs
  const knownUrls: Record<string, Partial<Link>> = {
    "youtube.com": {
      title: "YouTube",
      description:
        "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
      imageUrl:
        "https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg",
    },
    "naver.com": {
      title: "NAVER",
      description: "NAVER 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
      imageUrl:
        "https://play-lh.googleusercontent.com/Kbu0747Cx3rpzHcSbtM1zDriGFG74zVbtkPmVnOKpmLCS59l7IuKD5M3MKbaq_nEaZM",
    },
    "tving.com": {
      title: "TVING",
      description: "티빙에서 다양한 영화, 드라마, 예능 프로그램을 만나보세요.",
      imageUrl:
        "https://image.tving.com/upload/pr/image/2022/08/17/091311_res.jpg",
    },
    "google.com": {
      title: "Google",
      description:
        "Search the world's information, including webpages, images, videos and more.",
      imageUrl:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    },
  };

  // Extract domain and check if it's a known URL
  const domain = extractDomain(url);

  for (const key of Object.keys(knownUrls)) {
    if (domain.includes(key)) {
      return knownUrls[key];
    }
  }

  // Generate random metadata for unknown URLs
  return {
    title: domain,
    description: `A website at ${url}`,
    imageUrl: "",
  };
};

// Link CRUD operations
export const getAllLinks = (): Link[] => {
  return [...links];
};

export const getLinksByFolder = (folderId: string): Link[] => {
  if (folderId === "all") {
    return getAllLinks();
  }
  return links.filter((link) => link.folderId === folderId);
};

export const addLink = async (url: string, folderId: string): Promise<Link> => {
  try {
    const metadata = await getUrlMetadata(url);

    const newLink: Link = {
      id: Date.now().toString(),
      url,
      title: metadata.title || extractDomain(url),
      description: metadata.description || "",
      imageUrl: metadata.imageUrl || "",
      folderId,
      createdAt: new Date().toISOString(),
    };

    links = [newLink, ...links];
    toast.success("링크가 추가되었습니다");
    return newLink;
  } catch (error) {
    toast.error("링크 추가에 실패했습니다");
    throw error;
  }
};

export const updateLink = (id: string, updates: Partial<Link>): Link => {
  links = links.map((link) => {
    if (link.id === id) {
      return { ...link, ...updates };
    }
    return link;
  });

  const updatedLink = links.find((link) => link.id === id);
  if (!updatedLink) {
    throw new Error("Link not found");
  }

  toast.success("링크가 수정되었습니다");
  return updatedLink;
};

export const deleteLink = (id: string): void => {
  links = links.filter((link) => link.id !== id);
  toast.success("링크가 삭제되었습니다");
};

// Folder CRUD operations
export const getAllFolders = (): Folder[] => {
  return [...folders];
};

export const addFolder = (name: string): Folder => {
  const newFolder: Folder = {
    id: Date.now().toString(),
    name,
    createdAt: new Date().toISOString(),
  };

  folders = [...folders, newFolder];
  toast.success("폴더가 추가되었습니다");
  return newFolder;
};

export const updateFolder = (id: string, name: string): Folder => {
  folders = folders.map((folder) => {
    if (folder.id === id) {
      return { ...folder, name };
    }
    return folder;
  });

  const updatedFolder = folders.find((folder) => folder.id === id);
  if (!updatedFolder) {
    throw new Error("Folder not found");
  }

  toast.success("폴더가 수정되었습니다");
  return updatedFolder;
};

export const deleteFolder = (id: string): void => {
  // Update links in the deleted folder to be in the "all" folder
  links = links.map((link) => {
    if (link.folderId === id) {
      return { ...link, folderId: "all" };
    }
    return link;
  });

  folders = folders.filter((folder) => folder.id !== id && folder.id !== "all");
  toast.success("폴더가 삭제되었습니다");
};
