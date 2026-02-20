
function TestConnection() {
    const test = () => {
        fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "monko",
                email: "test@test.com",
                password: "12345"
            })
        })
            .then(res => res.text())
            .then(data => console.log("Ответ сервера:", data))
            .catch(err => console.error("Ошибка:", err));
    };

    return (
        <button onClick={test}>
            Проверить подключение
        </button>
    );
}

export default TestConnection;
