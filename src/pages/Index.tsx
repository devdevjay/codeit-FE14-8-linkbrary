
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddLink = () => {
    if (isLoggedIn) {
      navigate('/links');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9ff]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-[#8992ff]">세상의 모든 정보</span>를<br />
              쉽게 저장하고 관리해 보세요
            </h1>
            
            <div className="mt-8">
              <Button 
                className="gradient-btn px-8 py-6 text-lg"
                onClick={handleAddLink}
              >
                링크 추가하기
              </Button>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="/lovable-uploads/f3a4b490-c30c-4d04-a18e-7242a23116a6.png" 
              alt="Linkbrary App Screenshot" 
              className="w-full"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                <span className="text-[#ff6b6b]">원하는 링크</span>를<br />
                저장하세요
              </h2>
              <p className="text-gray-600 mb-6">
                나중에 다시 찾기 쉽게 모든 웹사이트 링크를 한 곳에서 관리하세요.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-[#f5f9ff] rounded-lg p-4">
                <img 
                  src="/lovable-uploads/7e16fd4f-0073-463c-828d-a7fbb8798517.png" 
                  alt="Linkbrary Feature" 
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Second Feature Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <img 
                  src="/lovable-uploads/cece702d-c0a3-4d03-9f34-c4c5ec7ae078.png" 
                  alt="Linkbrary Share Feature" 
                  className="w-full rounded"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                <span className="text-[#ffba69]">저장한 링크</span>를<br />
                공유해 보세요.
              </h2>
              <p className="text-gray-600 mb-6">
                친구나 팀원과 유용한 링크를 손쉽게 공유하세요. 단 하나의 클릭으로 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Third Feature Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                <span className="text-[#69c0ff]">링크를 폴더</span>로<br />
                관리하세요
              </h2>
              <p className="text-gray-600 mb-6">
                카테고리별로 링크를 정리하여 필요할 때 쉽게 찾을 수 있습니다.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-[#f5f9ff] rounded-lg p-4">
                <img 
                  src="/lovable-uploads/9203c05e-2617-44bc-9e6e-40684eca5508.png" 
                  alt="Linkbrary Folders Feature" 
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-[#8992ff]">링크브러리</span>와 함께<br />
              <span className="text-black">지금 시작하세요</span>
            </h2>
            <p className="text-gray-600 mb-10">
              지금 바로 링크브러리를 시작하고 웹의 정보를 체계적으로 관리하세요.
            </p>
            <Button 
              className="gradient-btn px-8 py-6 text-lg"
              onClick={handleAddLink}
            >
              시작하기
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
