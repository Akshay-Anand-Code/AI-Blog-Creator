namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class ScrapeBeyondChats extends Command {
    protected $signature = 'scrape:beyondchats';

    public function handle() {
        $url = "https://beyondchats.com/blogs/";
        $response = Http::get($url);
        $crawler = new Crawler($response->body());

        
        $lastPageLink = $crawler->filter('.page-numbers')->last()->previousAll()->first();
        $lastPageUrl = $lastPageLink->attr('href');

        $this->info("Navigating to oldest articles at: $lastPageUrl");

        $lastPageResponse = Http::get($lastPageUrl);
        $lastPageCrawler = new Crawler($lastPageResponse->body());

        
        $articles = [];
        $lastPageCrawler->filter('article')->each(function (Crawler $node) use (&$articles) {
            $articles[] = [
                'title' => $node->filter('h2')->text(),
                'url'   => $node->filter('h2 a')->attr('href'),
                'excerpt' => $node->filter('.entry-content, .post-excerpt')->text(),
            ];
        });

        
        $oldestFive = array_slice($articles, -5);

        foreach ($oldestFive as $data) {
            Article::updateOrCreate(['url' => $data['url']], $data);
            $this->line("Stored: " . $data['title']);
        }

        $this->info("Scraping completed.");
    }
}