import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="mb-4">Last updated: May 11, 2025</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              1. codeit-linkbrary-HandongJo
            </h2>
            <p className="mb-4">
              여기에 Privacy Policy 내용을 입력할 수 있습니다.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
