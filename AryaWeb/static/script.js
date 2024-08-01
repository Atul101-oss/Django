function changeLink(app) {
    const link = document.getElementById('siteTitle');
    console.log(`Changing link for: ${app}`); // Debugging statement
    switch (app) {
        case 'home':
            link.href = "{% url 'home:HomePage' %}";
            break;
        case 'store':
            link.href = "{% url 'bookStore:browse' %}";
            break;
        case 'chatapp':
            link.href = "{% url 'chats:chatRoom' %}";
            break;
        default:
            link.href = "{% url 'home:HomePage' %}";
            break;
    }
    console.log(`New href: ${link.href}`); // Debugging statement
}