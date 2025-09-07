

const Result = (props) => {

    return (
        <>
            <h2>Kết quả</h2>
            <p className="result">Bạn đã làm đúng {props.score}/{props.total} câu, thật ngu ngốc!</p>
            <div className="resultButtonsContainer">
                <button className="result-button" onClick={props.review}>Xem lại</button>
                <button className="result-button" onClick={props.restart}>Làm lại</button>
            </div>
        </>
    )
}

export default Result