import { useState, useEffect } from "react";
import Result from "./Result";

const quizData = [
  {
    question: "Anh Hậu thích ăn gì?",
    options: ["Chuối chiên", "Cá viên chiên", "Bún đậu", "Cơm sườn"],
    answer: "Chuối chiên",
  },
  {
    question:
      "Anh Hậu ghét con gì?",
    options: ["Con Nhí", "Con bò sữa", "Con Nhím", "Con Mèo"],
    answer: "Con Nhí",
  },
  {
    question:
      "Anh Hậu muốn đi về lúc mấy giờ?",
    options: ["12 giờ", "10 giờ", "11 giờ", "Không về"],
    answer: "10 giờ",
  },
  {
    question: "Anh Hậu thường làm gì khi rảnh?",
    options: ["Xem ảnh gái", "Học bài", "Chơi game", "Ngủ"],
    answer: "Ngủ",
  },
  // {
  //   question: "Bộ nhớ Stack dùng để làm gì?",
  //   options: [
  //     "Lưu trữ dữ liệu dạng hàng đợi",
  //     "Lưu trữ các lời gọi hàm (function calls)",
  //     "Lưu ảnh",
  //     "Lưu video",
  //   ],
  //   answer: "Lưu trữ các lời gọi hàm (function calls)",
  // },
  // {
  //   question: "Toán tử nào so sánh nghiêm ngặt giá trị và kiểu dữ liệu?",
  //   options: ["==", "===", "!=", "="],
  //   answer: "===",
  // },
  // {
  //   question: "JSON là viết tắt của gì?",
  //   options: [
  //     "Java Syntax Object Notation",
  //     "JavaScript Object Notation",
  //     "JavaScript Online Network",
  //     "Java Server Object Notation",
  //   ],
  //   answer: "JavaScript Object Notation",
  // },
  // {
  //   question:
  //     "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc FIFO (First In First Out)?",
  //   options: ["Stack", "Queue", "Array", "Linked List"],
  //   answer: "Queue",
  // },
  // {
  //   question: "Câu lệnh nào in ra nội dung trong console trình duyệt?",
  //   options: ["print()", "console.log()", "echo()", "show()"],
  //   answer: "console.log()",
  // },
  // {
  //   question: "Khi bạn viết `let x;` trong JavaScript, giá trị ban đầu của x là gì?",
  //   options: ["null", "0", "undefined", "false"],
  //   answer: "undefined",
  // },
  // {
  //   question: "HTML là gì?",
  //   options: [
  //     "Ngôn ngữ lập trình để xử lý logic",
  //     "Ngôn ngữ đánh dấu để tạo cấu trúc website",
  //     "Framework của JavaScript",
  //     "Trình duyệt web",
  //   ],
  //   answer: "Ngôn ngữ đánh dấu để tạo cấu trúc website",
  // },
  // {
  //   question: "Trong thuật toán, Big O dùng để đo gì?",
  //   options: [
  //     "Tốc độ mạng",
  //     "Thời gian load ảnh",
  //     "Độ phức tạp của thuật toán",
  //     "Dung lượng RAM máy tính",
  //   ],
  //   answer: "Độ phức tạp của thuật toán",
  // },
];


const Quiz = () => {

    const [optionSelected, setOptionSelected] = useState("")    
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [ended, setEnded] = useState(false)
    const [userAnswer, setUserAnswer] = useState(Array.from({length: quizData.length}))
    
    const handleSelected = (option) => {
        setOptionSelected(option)

        const temArray = [...userAnswer]
        temArray[currentQuestion] = option
        setUserAnswer(temArray)

        if (option === quizData[currentQuestion].answer){
          setScore(score+1)
        }
    }

    useEffect(() => {
        if (userAnswer[currentQuestion] != ""){
          setOptionSelected(userAnswer[currentQuestion])
        }else{
          setOptionSelected("")
        }
    }, [currentQuestion, userAnswer])

    const handleNext = () => {
      if (currentQuestion+1 < quizData.length){
        setCurrentQuestion(currentQuestion+1)
      }

      if (currentQuestion == quizData.length-1){
        setEnded(true)
      }

    }

    const handleBack = () => {
      if (currentQuestion > 0){
        setCurrentQuestion(currentQuestion-1)
      }
    }

    const restart = () => {
      setCurrentQuestion(0)
      setOptionSelected("")
      setScore(0)
      setEnded(false)
      setUserAnswer(Array.from({length: quizData.length}))
    }

    const review = () => {
      setEnded(false)
      setCurrentQuestion(0)
    }

    if (ended){
      return (
        <Result score={score} total={quizData.length} restart={restart} review={review}/>
      )
    }

    return (
    <>
        <h2>Câu {currentQuestion+1}</h2>
        <p className="question">{quizData[currentQuestion].question}</p>
        {
            quizData[currentQuestion].options.map((option) => (
                <button 
                    className={`option ${optionSelected === option ? "selected" : ""}`}
                    disabled={!!optionSelected && optionSelected !== option}
                    key={option}
                    onClick={() => handleSelected(option)} >
                        {option}
                    </button>
            ))

            
        }

        {
            optionSelected? (optionSelected === quizData[currentQuestion].answer ? (
                <p className="correct-answer">Câu trả lời của bạn chính xác</p>
            ) : (
                <p className="incorrect-answer">Câu trả lời của bạn chưa chính xác</p>
            )): ""
        }

        
    
        <div className="nav-buttons">
            <button onClick={handleBack}>Quay lại</button>
            <button onClick={handleNext} disabled={!optionSelected}>{currentQuestion==quizData.length-1? "Hoàn thành":"Kế tiếp"}</button>
        </div>
    </>
)}

export default Quiz