export const DATAFORSEO_API_URL = "https://api.dataforseo.com/v3";

export async function getKeywordData(keyword: string) {
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
    const creds = Buffer.from(`${login}:${password}`).toString('base64');

    // We will use the 'search_volume' endpoint for keyword metrics
    // and 'related_keywords' if possible, or just mock the related for now to save tokens if needed?
    // The user wants real data.
    // Standard DataForSEO Search Volume Live

    const postData = [
        {
            "location_name": "United States",
            "language_name": "English",
            "keywords": [keyword]
        }
    ];

    try {
        const response = await fetch(`${DATAFORSEO_API_URL}/keywords_data/google_ads/search_volume/live`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${creds}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            // Fallback for demo if API fails or creds are wrong, but we should log it
            console.error("DataForSEO API Error:", response.status, await response.text());
            throw new Error("Failed to fetch keyword data");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("DataForSEO Request Failed:", error);
        return null;
    }
}

export async function getRelatedKeywords(keyword: string) {
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
    const creds = Buffer.from(`${login}:${password}`).toString('base64');

    // Using keywords_for_keywords/live which usually gives related ideas
    const postData = [
        {
            "location_name": "United States",
            "language_name": "English",
            "keys": [keyword],
            "limit": 5 // Limit to 5 to save tokens/complexity for now
        }
    ];

    try {
        const response = await fetch(`${DATAFORSEO_API_URL}/keywords_data/google_ads/keywords_for_keywords/live`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${creds}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            console.error("DataForSEO Related API Error:", response.status, await response.text());
            throw new Error("Failed to fetch related keywords");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("DataForSEO Related Request Failed:", error);
        return null; // Handle null gracefully in the API route
    }
}
