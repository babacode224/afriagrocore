import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Youtube, BookOpen, FileText, GraduationCap, ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Curriculum data structure
const curriculumData = {
  "1": {
    phase: "Phase 1: Foundations",
    title: "Introduction to Global Agriculture",
    topics: ["Subsistence vs Commercial Farming", "Economic Role of Agriculture", "Global Food Systems"],
    description: "Learn the fundamentals of global agriculture, understanding the differences between subsistence and commercial farming, and the critical economic role agriculture plays in societies worldwide.",
    youtubeSearch: "introduction+to+agriculture+basics",
    scholarSearch: "introduction+global+agriculture",
    keywords: ["agriculture basics", "farming types", "agricultural economics"]
  },
  "2": {
    phase: "Phase 1: Foundations",
    title: "Agricultural Ecology & Climate",
    topics: ["Weather Patterns", "Climate Change Impact", "Adaptation Strategies"],
    description: "Understand how weather patterns and climate change affect agricultural production, and learn adaptation strategies for sustainable farming in changing climates.",
    youtubeSearch: "agricultural+ecology+climate+change",
    scholarSearch: "agricultural+ecology+climate",
    keywords: ["climate agriculture", "weather patterns farming", "climate adaptation"]
  },
  "3": {
    phase: "Phase 1: Foundations",
    title: "Botany for Farmers",
    topics: ["Plant Growth Cycles", "Photosynthesis", "Plant Anatomy"],
    description: "Master the botanical knowledge essential for farmers, including plant growth cycles, photosynthesis processes, and understanding plant anatomy for better crop management.",
    youtubeSearch: "botany+for+farmers+plant+growth",
    scholarSearch: "plant+botany+agriculture",
    keywords: ["plant science", "crop botany", "plant physiology"]
  },
  "4": {
    phase: "Phase 1: Foundations",
    title: "Soil Science & Management",
    topics: ["Soil Types", "pH Testing", "Land Preparation", "Soil Fertility"],
    description: "Deep dive into soil science covering soil types, pH testing methods, proper land preparation techniques, and maintaining soil fertility for optimal crop production.",
    youtubeSearch: "soil+science+management+farming",
    scholarSearch: "soil+science+agriculture",
    keywords: ["soil types", "soil pH", "soil fertility", "land preparation"]
  },
  "5": {
    phase: "Phase 1: Foundations",
    title: "Farm Tools & Basic Mechanization",
    topics: ["Hand Tools", "Tractor Maintenance", "Farm Equipment"],
    description: "Learn about essential farm tools, basic mechanization, tractor operation and maintenance, and selecting the right equipment for your farming operations.",
    youtubeSearch: "farm+tools+equipment+mechanization",
    scholarSearch: "agricultural+mechanization",
    keywords: ["farm tools", "tractor maintenance", "agricultural equipment"]
  },
  "6": {
    phase: "Phase 2: Crop Production Mastery",
    title: "Arable & Staple Crops",
    topics: ["Maize", "Cassava", "Rice", "Yam", "Wheat"],
    description: "Comprehensive guide to growing major staple crops including maize, cassava, rice, yam, and wheat - from planting to harvest.",
    youtubeSearch: "staple+crops+farming+maize+rice+wheat",
    scholarSearch: "staple+crops+production",
    keywords: ["maize farming", "rice cultivation", "wheat production", "cassava growing"]
  },
  "7": {
    phase: "Phase 2: Crop Production Mastery",
    title: "Cash Crop Farming",
    topics: ["Cocoa", "Coffee", "Oil Palm", "Cashew", "Rubber"],
    description: "Learn commercial cash crop farming including cocoa, coffee, oil palm, cashew, and rubber cultivation for profitable agricultural business.",
    youtubeSearch: "cash+crops+cocoa+coffee+farming",
    scholarSearch: "cash+crop+production",
    keywords: ["cocoa farming", "coffee cultivation", "oil palm", "cashew growing"]
  },
  "8": {
    phase: "Phase 2: Crop Production Mastery",
    title: "Horticulture (Vegetable Farming)",
    topics: ["Tomatoes", "Peppers", "Onions", "Leafy Greens"],
    description: "Master vegetable farming techniques for tomatoes, peppers, onions, and leafy greens with focus on yield optimization and pest management.",
    youtubeSearch: "vegetable+farming+tomatoes+peppers",
    scholarSearch: "horticulture+vegetable+production",
    keywords: ["vegetable farming", "tomato growing", "pepper cultivation"]
  },
  "9": {
    phase: "Phase 2: Crop Production Mastery",
    title: "Fruit Orchard Management",
    topics: ["Mangoes", "Citrus", "Avocado", "Pineapple"],
    description: "Complete guide to fruit orchard establishment and management covering mangoes, citrus, avocado, and pineapple cultivation.",
    youtubeSearch: "fruit+orchard+management+mango+citrus",
    scholarSearch: "fruit+orchard+management",
    keywords: ["fruit farming", "orchard management", "mango cultivation"]
  },
  "10": {
    phase: "Phase 2: Crop Production Mastery",
    title: "Hydroponics & Soilless Farming",
    topics: ["Water-based Systems", "Coco-peat", "Urban Farming"],
    description: "Modern soilless farming techniques including hydroponics, aquaponics, and urban farming systems for high-yield production.",
    youtubeSearch: "hydroponics+soilless+farming+tutorial",
    scholarSearch: "hydroponics+agriculture",
    keywords: ["hydroponics", "soilless farming", "urban agriculture"]
  },
  "11": {
    phase: "Phase 2: Crop Production Mastery",
    title: "Plant Protection",
    topics: ["Pest Identification", "Disease Treatment", "Safe Practices"],
    description: "Learn integrated pest management, disease identification and treatment, and safe pesticide application practices.",
    youtubeSearch: "plant+protection+pest+management",
    scholarSearch: "integrated+pest+management",
    keywords: ["pest control", "plant diseases", "IPM"]
  },
  "12": {
    phase: "Phase 3: Livestock & Animal Science",
    title: "Introduction to Animal Husbandry",
    topics: ["Animal Health", "Nutrition", "Welfare"],
    description: "Fundamentals of animal husbandry covering health management, nutrition planning, and animal welfare standards.",
    youtubeSearch: "animal+husbandry+basics+livestock",
    scholarSearch: "animal+husbandry+management",
    keywords: ["animal husbandry", "livestock management", "animal nutrition"]
  },
  "13": {
    phase: "Phase 3: Livestock & Animal Science",
    title: "Poultry Farming",
    topics: ["Layers", "Broilers", "Hatchery Management"],
    description: "Complete poultry farming guide covering layer and broiler production, hatchery management, and disease prevention.",
    youtubeSearch: "poultry+farming+layers+broilers",
    scholarSearch: "poultry+production+management",
    keywords: ["poultry farming", "chicken farming", "broiler production"]
  },
  "14": {
    phase: "Phase 3: Livestock & Animal Science",
    title: "Aquaculture (Fish Farming)",
    topics: ["Catfish", "Tilapia", "Water Quality"],
    description: "Fish farming techniques for catfish and tilapia, water quality management, and profitable aquaculture practices.",
    youtubeSearch: "fish+farming+aquaculture+catfish+tilapia",
    scholarSearch: "aquaculture+fish+production",
    keywords: ["fish farming", "aquaculture", "catfish", "tilapia"]
  },
  "15": {
    phase: "Phase 3: Livestock & Animal Science",
    title: "Ruminant Production",
    topics: ["Cattle", "Sheep", "Goats", "Dairy"],
    description: "Ruminant livestock management including cattle, sheep, goat farming, and dairy production systems.",
    youtubeSearch: "cattle+sheep+goat+farming",
    scholarSearch: "ruminant+livestock+production",
    keywords: ["cattle farming", "sheep farming", "goat farming", "dairy"]
  },
  "16": {
    phase: "Phase 3: Livestock & Animal Science",
    title: "Pig Farming (Piggery)",
    topics: ["Breeding", "Feeding", "Waste Management"],
    description: "Pig farming essentials covering breeding programs, nutrition, housing, and waste management systems.",
    youtubeSearch: "pig+farming+piggery+management",
    scholarSearch: "pig+production+management",
    keywords: ["pig farming", "piggery", "swine production"]
  },
  "17": {
    phase: "Phase 3: Livestock & Animal Science",
    title: "Snail & Bee Farming",
    topics: ["Heliculture", "Apiculture", "Mini-Livestock"],
    description: "Alternative livestock: snail farming (heliculture) and beekeeping (apiculture) for diversified farm income.",
    youtubeSearch: "snail+farming+beekeeping+tutorial",
    scholarSearch: "heliculture+apiculture",
    keywords: ["snail farming", "beekeeping", "apiculture"]
  },
  "18": {
    phase: "Phase 4: Sustainability & Modern Tech",
    title: "Organic & Regenerative Farming",
    topics: ["Composting", "Mulching", "Chemical-free"],
    description: "Sustainable farming practices including organic methods, regenerative agriculture, and chemical-free production.",
    youtubeSearch: "organic+farming+regenerative+agriculture",
    scholarSearch: "organic+regenerative+farming",
    keywords: ["organic farming", "regenerative agriculture", "sustainable farming"]
  },
  "19": {
    phase: "Phase 4: Sustainability & Modern Tech",
    title: "Irrigation & Water Management",
    topics: ["Drip Irrigation", "Solar Pumps", "Conservation"],
    description: "Modern irrigation systems, water conservation techniques, and efficient water management for agriculture.",
    youtubeSearch: "irrigation+systems+drip+irrigation",
    scholarSearch: "agricultural+irrigation+management",
    keywords: ["irrigation", "drip irrigation", "water management"]
  },
  "20": {
    phase: "Phase 4: Sustainability & Modern Tech",
    title: "Greenhouse Technology",
    topics: ["Controlled Environment", "Year-round Production"],
    description: "Greenhouse farming techniques for controlled environment agriculture and year-round crop production.",
    youtubeSearch: "greenhouse+farming+technology",
    scholarSearch: "greenhouse+agriculture",
    keywords: ["greenhouse farming", "controlled environment", "protected cultivation"]
  },
  "21": {
    phase: "Phase 4: Sustainability & Modern Tech",
    title: "Forestry & Agroforestry",
    topics: ["Tree Integration", "Timber Value"],
    description: "Agroforestry systems integrating trees with crops/livestock for sustainable land use and additional income.",
    youtubeSearch: "agroforestry+systems+farming",
    scholarSearch: "agroforestry+sustainable+agriculture",
    keywords: ["agroforestry", "tree farming", "sustainable forestry"]
  },
  "22": {
    phase: "Phase 5: The Business of Farming",
    title: "Farm Management & Record Keeping",
    topics: ["Expense Tracking", "Labor Management", "Profit Analysis"],
    description: "Business management for farms including financial record keeping, expense tracking, and profitability analysis.",
    youtubeSearch: "farm+management+record+keeping",
    scholarSearch: "farm+business+management",
    keywords: ["farm management", "agricultural records", "farm accounting"]
  },
  "23": {
    phase: "Phase 5: The Business of Farming",
    title: "Agribusiness Finance & Credit",
    topics: ["Loans", "Grants", "Insurance"],
    description: "Agricultural financing options including loans, grants, insurance, and accessing capital for farm operations.",
    youtubeSearch: "agricultural+finance+loans+grants",
    scholarSearch: "agricultural+finance+credit",
    keywords: ["farm loans", "agricultural grants", "farm insurance"]
  },
  "24": {
    phase: "Phase 5: The Business of Farming",
    title: "Post-Harvest & Value Addition",
    topics: ["Processing", "Storage", "Shelf Life", "Pricing"],
    description: "Post-harvest handling, value addition through processing, storage techniques, and pricing strategies.",
    youtubeSearch: "post+harvest+value+addition+agriculture",
    scholarSearch: "post+harvest+management",
    keywords: ["post-harvest", "value addition", "food processing"]
  },
  "25": {
    phase: "Phase 5: The Business of Farming",
    title: "Agricultural Marketing & Export",
    topics: ["Finding Buyers", "Packaging", "International Market"],
    description: "Marketing agricultural products, finding buyers, export procedures, and accessing international markets.",
    youtubeSearch: "agricultural+marketing+export",
    scholarSearch: "agricultural+marketing+export",
    keywords: ["agricultural marketing", "farm exports", "market access"]
  }
};

export default function CurriculumResource() {
  const [, params] = useRoute('/learning/curriculum/:id');
  const unitId = params?.id || "1";
  const unit = curriculumData[unitId as keyof typeof curriculumData];

  if (!unit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Unit Not Found</h1>
          <Link href="/learning">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning Hub
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learning">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning Hub
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-white/20 text-white mb-4">
              Unit {unitId} • {unit.phase}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {unit.title}
            </h1>
            <p className="text-lg text-emerald-50 max-w-3xl">
              {unit.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {unit.topics.map((topic, i) => (
                <Badge key={i} className="bg-white/10 text-white border-white/20">
                  {topic}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* YouTube Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-red-600" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>
                  Watch educational videos on {unit.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://www.youtube.com/results?search_query=${unit.youtubeSearch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700 mb-4">
                    <Search className="mr-2 h-4 w-4" />
                    Search YouTube Videos
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-sm text-slate-600 mb-4">
                  Recommended channels for this topic:
                </p>
                <div className="space-y-2">
                  <a href="https://www.youtube.com/@DiscoverAgriculture" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Discover Agriculture</span>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@MillennialFarmer" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Millennial Farmer</span>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@FarmingInAfricaOfficial" target="_blank" rel="noopener noreferrer" className="block p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Farming In Africa</span>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Academic Papers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  Academic Research
                </CardTitle>
                <CardDescription>
                  Access scholarly articles and research papers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://scholar.google.com/scholar?q=${unit.scholarSearch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                    <Search className="mr-2 h-4 w-4" />
                    Search Google Scholar
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={`https://www.researchgate.net/search?q=${unit.scholarSearch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full mb-4">
                    <Search className="mr-2 h-4 w-4" />
                    Search ResearchGate
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="text-sm text-slate-600">
                  Find peer-reviewed research papers, theses, and academic publications on {unit.title.toLowerCase()}.
                </p>
              </CardContent>
            </Card>

            {/* Free E-books & PDFs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                  Free E-books & Guides
                </CardTitle>
                <CardDescription>
                  Download free agricultural textbooks and guides
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://www.fao.org/documents/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">FAO Document Repository</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Free agricultural publications from the UN Food and Agriculture Organization
                  </p>
                </a>
                <a
                  href="https://www.agrimoon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">AgriMoon</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Free agricultural e-books and course materials from ICAR
                  </p>
                </a>
                <a
                  href="https://www.manage.gov.in/publications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">MANAGE Publications</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Farmer handbooks and agricultural management resources
                  </p>
                </a>
              </CardContent>
            </Card>

            {/* Online Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Online Courses & Articles
                </CardTitle>
                <CardDescription>
                  Free and paid courses on agricultural topics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://www.coursera.org/search?query=agriculture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Coursera Agriculture Courses</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    University-level courses on agriculture (many free to audit)
                  </p>
                </a>
                <a
                  href="https://www.edx.org/learn/agriculture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">edX Agriculture Programs</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Free online courses from top universities
                  </p>
                </a>
                <a
                  href={`https://www.google.com/search?q=${unit.keywords.join('+')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Web Articles & Guides</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Search for articles, blog posts, and practical guides
                  </p>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Keywords */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Search Keywords</CardTitle>
              <CardDescription>
                Use these keywords to find more resources on this topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {unit.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
