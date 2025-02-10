import feedparser

# URL of the Google News RSS feed
x = 'Italy'
x= x.replace(" ", "+")
gn_url = "https://news.google.com/rss/search?q=" + x + "&hl=en-GB&gl=GB&ceid=US:en"

# Parse the RSS feed
gn_feed = feedparser.parse(gn_url)
headlines = []
for entry in gn_feed.entries:
    news_title = entry.title
    news_link = entry.link
    publication_date = entry.published
    news_source = entry.source
    headlines.append(news_title)
print(x, len(headlines))