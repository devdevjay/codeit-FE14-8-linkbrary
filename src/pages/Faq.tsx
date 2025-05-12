
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqs = [
    {
      question: "Linkbrary는 어떤 서비스인가요?",
      answer: "Linkbrary는 유용한 웹사이트 링크를 수집, 정리하고 관리할 수 있는 서비스입니다. 중요한 URL을 저장하고 폴더별로 분류하여 언제든지 쉽게 찾을 수 있습니다."
    },
    {
      question: "계정은 어떻게 만드나요?",
      answer: "홈페이지 오른쪽 상단의 '로그인' 버튼을 클릭한 후, '회원가입하기' 링크를 통해 새 계정을 만들 수 있습니다. 이메일과 이름, 비밀번호를 입력하여 회원가입이 가능합니다."
    },
    {
      question: "링크는 어떻게 저장하나요?",
      answer: "로그인 후 상단의 '링크 추가하기' 버튼을 클릭하세요. URL을 입력하고 저장할 폴더를 선택한 다음 '추가하기' 버튼을 누르면 링크가 저장됩니다."
    },
    {
      question: "폴더는 어떻게 만들고 관리하나요?",
      answer: "'나의 링크' 페이지에서 '폴더 추가' 버튼을 클릭하여 새 폴더를 만들 수 있습니다. 폴더명을 입력하고 추가하면 됩니다. 각 폴더는 수정 및 삭제가 가능합니다."
    },
    {
      question: "저장된 링크를 수정하거나 삭제할 수 있나요?",
      answer: "네, 가능합니다. 저장된 링크 위에 마우스를 올리면 오른쪽 상단에 메뉴 아이콘이 나타납니다. 이 아이콘을 클릭하면 수정 또는 삭제 옵션을 선택할 수 있습니다."
    },
    {
      question: "Linkbrary는 어떤 정보를 저장하나요?",
      answer: "저장하신 URL의 제목, 설명, 이미지 등의 메타데이터를 수집하여 링크 카드 형태로 표시합니다. 이를 통해 단순한 URL 목록이 아닌 시각적으로 보기 좋은 링크 컬렉션을 만들 수 있습니다."
    },
    {
      question: "Linkbrary는 무료인가요?",
      answer: "네, Linkbrary의 기본 기능은 무료로 제공됩니다. 추후 추가 기능이나 저장 공간 확장을 위한 프리미엄 플랜이 출시될 수 있습니다."
    },
    {
      question: "비밀번호를 잊어버렸어요. 어떻게 해야 하나요?",
      answer: "로그인 페이지에서 '비밀번호를 잊으셨나요?' 링크를 클릭하시면 비밀번호 재설정 안내 이메일을 받으실 수 있습니다. 이메일에 포함된 지침에 따라 새 비밀번호를 설정하세요."
    },
    {
      question: "서비스 이용 중 문제가 발생했어요. 어디에 문의해야 하나요?",
      answer: "support@linkbrary.example.com으로 이메일을 보내주시면 최대한 빠르게 도움을 드리겠습니다. 문제 상황을 자세히 설명해 주시면 더 효과적인 지원이 가능합니다."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">자주 묻는 질문 (FAQ)</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">아직 질문이 있으신가요?</h2>
            <p className="text-gray-600 mb-4">
              언제든지 이메일로 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.
            </p>
            <a 
              href="mailto:support@linkbrary.example.com"
              className="gradient-btn px-6 py-2 inline-block"
            >
              이메일 문의하기
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
