import http from "../http/index";

export async function getAllNews(token = null) {
    const response = await http.get("/news",{
        cancelToken: http.source.token
    });
    return response;
}