export default async function handler(req, res) {
    // Allow requests from anywhere (including Roblox)
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { userId } = req.query;

    // Make sure userId was provided
    if (!userId) {
        return res.status(400).json({ error: "Missing userId parameter" });
    }

    // Make sure it's actually a number
    if (isNaN(userId)) {
        return res.status(400).json({ error: "userId must be a number" });
    }

    try {
        const response = await fetch(
            `https://badges.roblox.com/v1/users/${userId}/badges?limit=100&sortOrder=Asc`
        );

        // If Roblox returned an error
        if (!response.ok) {
            return res.status(response.status).json({ error: "Roblox API error" });
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch badges", details: err.message });
    }
}
