import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { BookOpen, Play, Star, Youtube, Globe, MapPin, Filter, Search, ExternalLink } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// YouTube Channels Data
const youtubeChannels = [
  // African Channels
  {
    id: 1,
    name: "Farming In Africa",
    region: "African",
    description: "Transforming livestock farming across Africa. Practical training on scaling small farms into commercial agribusinesses, managing workers, and improving genetic breeds.",
    focus: ["Livestock", "Business", "Scaling"],
    level: "Intermediate",
    subscribers: "50K+",
    url: "https://www.youtube.com/@FarmingInAfricaOfficial",
    thumbnail: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "FarmKenya",
    region: "African",
    description: "Kenyan agriculture channel. Excellent for learning about vegetable farming, soil testing, irrigation systems, and practical farming techniques.",
    focus: ["Vegetables", "Soil", "Irrigation"],
    level: "Beginner",
    subscribers: "30K+",
    url: "https://www.youtube.com/@FarmKenya",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "African Farming",
    region: "African",
    description: "South African-based platform sharing success stories and offering accredited training and mentorship for aspiring farmers.",
    focus: ["Success Stories", "Mentorship", "Training"],
    level: "All Levels",
    subscribers: "40K+",
    url: "https://www.youtube.com/@africanfarming4915",
    thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Farmworx Kenya",
    region: "African",
    description: "Kenyan agricultural equipment and farming solutions. Covers modern farming technology, irrigation systems, and agricultural innovation.",
    focus: ["Innovation", "Hydroponics", "Aquaculture"],
    level: "Advanced",
    subscribers: "25K+",
    url: "https://www.youtube.com/@FarmworxKenya",
    thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Africa Farming",
    region: "African",
    description: "African farming practices and techniques. Crop-specific guides, livestock management, and agricultural business strategies across Africa.",
    focus: ["Vegetables", "Cost Analysis", "West Africa"],
    level: "Beginner",
    subscribers: "20K+",
    url: "https://www.youtube.com/channel/UC0tTdfzOJpH-lDyeMKregNQ",
    thumbnail: "https://images.unsplash.com/photo-1592921870583-09be149a46b3?w=400&h=300&fit=crop"
  },
  // International Channels
  {
    id: 6,
    name: "Discover Agriculture",
    region: "International",
    description: "Massive resource for global agricultural knowledge. Covers crop production, animal husbandry, sustainable practices, and latest farming machinery.",
    focus: ["Global", "Machinery", "Sustainability"],
    level: "All Levels",
    subscribers: "500K+",
    url: "https://www.youtube.com/@DiscoverAgriculture",
    thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Sandi Brock - Sheepishly Me",
    region: "International",
    description: "Canadian sheep farming channel. Transparent look at managing a family farm, livestock behavior, and daily farm life realities.",
    focus: ["Sheep", "Livestock", "Family Farm"],
    level: "Beginner",
    subscribers: "100K+",
    url: "https://www.youtube.com/@SandiBrock",
    thumbnail: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "MN Millennial Farmer",
    region: "International",
    description: "One of the most popular farming channels globally. Explains large-scale row-crop farming (corn and soybeans), soil health, and modern technology.",
    focus: ["Large-Scale", "Technology", "Soil Health"],
    level: "Intermediate",
    subscribers: "800K+",
    url: "https://www.youtube.com/@MillennialFarmer",
    thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Welker Farms",
    region: "International",
    description: "Montana-based large-scale farming operation. Documents modern farming equipment, grain production, and agricultural innovation.",
    focus: ["Large-Scale", "Equipment", "Grain"],
    level: "Beginner",
    subscribers: "500K+",
    url: "https://www.youtube.com/@WelkerFarmsInc",
    thumbnail: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop"
  },
  {
    id: 10,
    name: "How Farms Work",
    region: "International",
    description: "Educational channel explaining how farms operate. Covers agricultural science, farming processes, and practical how-to guides for farmers.",
    focus: ["Education", "Science", "How-To"],
    level: "All Levels",
    subscribers: "200K+",
    url: "https://www.youtube.com/@HowFarmsWork",
    thumbnail: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop"
  }
];

// Learning Curriculum Units
const curriculumUnits = [
  {
    phase: "Phase 1: Foundations",
    units: [
      { id: 1, title: "Introduction to Global Agriculture", topics: ["Subsistence vs Commercial", "Economic Role"] },
      { id: 2, title: "Agricultural Ecology & Climate", topics: ["Weather Patterns", "Climate Change"] },
      { id: 3, title: "Botany for Farmers", topics: ["Plant Growth", "Photosynthesis"] },
      { id: 4, title: "Soil Science & Management", topics: ["Soil Types", "pH Testing", "Land Preparation"] },
      { id: 5, title: "Farm Tools & Basic Mechanization", topics: ["Hand Tools", "Tractor Maintenance"] }
    ]
  },
  {
    phase: "Phase 2: Crop Production Mastery",
    units: [
      { id: 6, title: "Arable & Staple Crops", topics: ["Maize", "Cassava", "Rice", "Yam", "Wheat"] },
      { id: 7, title: "Cash Crop Farming", topics: ["Cocoa", "Coffee", "Oil Palm", "Cashew", "Rubber"] },
      { id: 8, title: "Horticulture (Vegetable Farming)", topics: ["Tomatoes", "Peppers", "Onions", "Leafy Greens"] },
      { id: 9, title: "Fruit Orchard Management", topics: ["Mangoes", "Citrus", "Avocado", "Pineapple"] },
      { id: 10, title: "Hydroponics & Soilless Farming", topics: ["Water-based", "Coco-peat", "Urban Farming"] },
      { id: 11, title: "Plant Protection", topics: ["Pest Identification", "Disease Treatment", "Safe Practices"] }
    ]
  },
  {
    phase: "Phase 3: Livestock & Animal Science",
    units: [
      { id: 12, title: "Introduction to Animal Husbandry", topics: ["Animal Health", "Nutrition", "Welfare"] },
      { id: 13, title: "Poultry Farming", topics: ["Layers", "Broilers", "Hatchery Management"] },
      { id: 14, title: "Aquaculture (Fish Farming)", topics: ["Catfish", "Tilapia", "Water Quality"] },
      { id: 15, title: "Ruminant Production", topics: ["Cattle", "Sheep", "Goats", "Dairy"] },
      { id: 16, title: "Pig Farming (Piggery)", topics: ["Breeding", "Feeding", "Waste Management"] },
      { id: 17, title: "Snail & Bee Farming", topics: ["Heliculture", "Apiculture", "Mini-Livestock"] }
    ]
  },
  {
    phase: "Phase 4: Sustainability & Modern Tech",
    units: [
      { id: 18, title: "Organic & Regenerative Farming", topics: ["Composting", "Mulching", "Chemical-free"] },
      { id: 19, title: "Irrigation & Water Management", topics: ["Drip Irrigation", "Solar Pumps", "Conservation"] },
      { id: 20, title: "Greenhouse Technology", topics: ["Controlled Environment", "Year-round Production"] },
      { id: 21, title: "Forestry & Agroforestry", topics: ["Tree Integration", "Timber Value"] }
    ]
  },
  {
    phase: "Phase 5: The Business of Farming",
    units: [
      { id: 22, title: "Farm Management & Record Keeping", topics: ["Expense Tracking", "Labor", "Profits"] },
      { id: 23, title: "Agribusiness Finance & Credit", topics: ["Loans", "Grants", "Insurance"] },
      { id: 24, title: "Post-Harvest & Value Addition", topics: ["Processing", "Shelf Life", "Pricing"] },
      { id: 25, title: "Agricultural Marketing & Export", topics: ["Finding Buyers", "Packaging", "International Market"] }
    ]
  }
];

export default function Learning() {
  useDocumentTitle('Learning Hub - Agricultural Education & Training');
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter channels
  const filteredChannels = youtubeChannels.filter(channel => {
    const matchesRegion = selectedRegion === "all" || channel.region === selectedRegion;
    const matchesLevel = selectedLevel === "all" || channel.level === selectedLevel || channel.level === "All Levels";
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.focus.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesLevel && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 -mr-40 -mt-40 w-[700px] h-[700px] bg-emerald-500/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-bold text-5xl md:text-6xl text-white mb-4">
              Agricultural <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-300">Learning Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto mb-8">
              Master modern farming techniques from foundations to agribusiness with our comprehensive agricultural education platform. Access curated YouTube farming channels, structured agricultural curriculum, crop production guides, livestock management training, and sustainable farming practices from African and international agricultural experts. Learn precision farming, organic agriculture, irrigation systems, and agribusiness management.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Badge className="bg-white/20 text-white text-base px-4 py-2">
                <Youtube className="mr-2 h-4 w-4" />
                10 Expert Channels
              </Badge>
              <Badge className="bg-white/20 text-white text-base px-4 py-2">
                <BookOpen className="mr-2 h-4 w-4" />
                25 Curriculum Units
              </Badge>
              <Badge className="bg-white/20 text-white text-base px-4 py-2">
                <Globe className="mr-2 h-4 w-4" />
                African & Global Content
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search channels, topics, or focus areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="African">African</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* YouTube Channels Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Featured YouTube Channels
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn from the best agricultural educators across Africa and around the world
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChannels.map((channel, idx) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={channel.region === "African" ? "bg-emerald-600" : "bg-blue-600"}>
                        <MapPin className="mr-1 h-3 w-3" />
                        {channel.region}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{channel.name}</span>
                      <Youtube className="h-5 w-5 text-red-600" />
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {channel.subscribers} • {channel.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {channel.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {channel.focus.map((focus, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                    <a 
                      href={channel.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Youtube className="mr-2 h-4 w-4" />
                        Visit Channel
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredChannels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No channels found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedLevel("all");
                  setSearchQuery("");
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Learning Curriculum
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              25 structured units covering everything from basic farming to international agribusiness
            </p>
          </motion.div>
              <div className="space-y-4">          {curriculumUnits.map((phase, phaseIdx) => (
              <motion.div
                key={phaseIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: phaseIdx * 0.1 }}
              >
                <Card>
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <CardTitle className="text-2xl text-emerald-900">
                      {phase.phase}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {phase.units.map((unit) => (
                  <Link
                    key={unit.id}
                    href={`/learning/curriculum/${unit.id}`}
                  >
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                              {unit.id}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                {unit.title}
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {unit.topics.map((topic, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                    </div>
                  </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Start Your Agricultural Learning Journey Today
          </h2>
          <p className="text-lg mb-8 text-emerald-50">
            Access world-class agricultural education from African and international experts, completely free on YouTube
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
              <Youtube className="mr-2 h-5 w-5" />
              Explore Channels
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <BookOpen className="mr-2 h-5 w-5" />
              View Curriculum
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
