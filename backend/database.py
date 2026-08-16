"""
Product Database Layer for Predictive Cloud-Cost Caching Engine.
Contains 46 realistic e-commerce products across multiple categories.
Simulates database queries with authentic data retrieval latency (30-45ms).
"""
import time
import asyncio
from typing import Dict, List, Optional
from pydantic import BaseModel

class ProductItem(BaseModel):
    id: str
    name: str
    category: str
    price: float
    stock: int
    popularity: float          # Base baseline popularity 0.0 - 100.0
    requestFrequency: int      # Base request count
    lastAccessed: float        # Timestamp
    dataSize: int              # Size in bytes (e.g. 1024 - 8192 bytes)
    databaseRetrievalCost: float  # In USD (e.g. $0.0045)
    description: str
    imageUrl: str
    specs: Dict[str, str]

# Seed catalog of 46 realistic e-commerce products
SEED_PRODUCTS: List[Dict] = [
    # --- Smartphones ---
    {
        "id": "prod-101",
        "name": "Apple iPhone 16 Pro Max",
        "category": "Smartphones",
        "price": 1199.99,
        "stock": 142,
        "popularity": 96.5,
        "requestFrequency": 850,
        "dataSize": 4120,
        "databaseRetrievalCost": 0.0045,
        "description": "6.9-inch Super Retina XDR display with Titanium design, A18 Pro chip, and Camera Control.",
        "imageUrl": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80",
        "specs": {"Display": "6.9 OLED", "Chip": "A18 Pro", "Storage": "256GB", "Battery": "4685 mAh"}
    },
    {
        "id": "prod-102",
        "name": "Samsung Galaxy S24 Ultra",
        "category": "Smartphones",
        "price": 1299.99,
        "stock": 98,
        "popularity": 94.0,
        "requestFrequency": 790,
        "dataSize": 4250,
        "databaseRetrievalCost": 0.0045,
        "description": "Galaxy AI phone with Titanium frame, 200MP camera, Snapdragon 8 Gen 3, and built-in S Pen.",
        "imageUrl": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
        "specs": {"Display": "6.8 QHD+ AMOLED", "Chip": "SD 8 Gen 3", "Storage": "512GB", "Camera": "200MP Quad"}
    },
    {
        "id": "prod-103",
        "name": "Google Pixel 9 Pro XL",
        "category": "Smartphones",
        "price": 1099.00,
        "stock": 75,
        "popularity": 88.5,
        "requestFrequency": 520,
        "dataSize": 3890,
        "databaseRetrievalCost": 0.0045,
        "description": "Advanced Gemini AI integration, Tensor G4 processor, and pro-level triple camera system.",
        "imageUrl": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80",
        "specs": {"Display": "6.8 Actua OLED", "Chip": "Tensor G4", "Storage": "128GB", "AI": "Gemini Nano"}
    },
    {
        "id": "prod-104",
        "name": "OnePlus 12",
        "category": "Smartphones",
        "price": 799.99,
        "stock": 110,
        "popularity": 76.0,
        "requestFrequency": 340,
        "dataSize": 3600,
        "databaseRetrievalCost": 0.0045,
        "description": "Flagship power with Hasselblad 4th Gen camera and 100W SUPERVOOC charging.",
        "imageUrl": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80",
        "specs": {"Display": "6.82 2K ProXDR", "Chip": "SD 8 Gen 3", "Charging": "100W", "RAM": "16GB"}
    },
    {
        "id": "prod-105",
        "name": "Sony Xperia 1 VI",
        "category": "Smartphones",
        "price": 1399.00,
        "stock": 35,
        "popularity": 64.0,
        "requestFrequency": 180,
        "dataSize": 3750,
        "databaseRetrievalCost": 0.0045,
        "description": "True optical 85-170mm telephoto zoom lens with BRAVIA display tuning.",
        "imageUrl": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80",
        "specs": {"Audio": "3.5mm Hi-Res", "Camera": "True Optical Zoom", "Chip": "SD 8 Gen 3"}
    },

    # --- Laptops ---
    {
        "id": "prod-201",
        "name": "MacBook Pro 16\" M3 Max",
        "category": "Laptops",
        "price": 3499.00,
        "stock": 40,
        "popularity": 95.0,
        "requestFrequency": 810,
        "dataSize": 5120,
        "databaseRetrievalCost": 0.0045,
        "description": "Monster compute for developers & 3D artists with Liquid Retina XDR display and 22h battery.",
        "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
        "specs": {"CPU": "16-core M3 Max", "Unified Memory": "48GB", "SSD": "1TB", "Display": "16.2 XDR"}
    },
    {
        "id": "prod-202",
        "name": "Dell XPS 16 OLED",
        "category": "Laptops",
        "price": 2499.99,
        "stock": 55,
        "popularity": 84.5,
        "requestFrequency": 430,
        "dataSize": 4700,
        "databaseRetrievalCost": 0.0045,
        "description": "Futuristic seamless glass touchpad with 4K OLED InfinityEdge touch display.",
        "imageUrl": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80",
        "specs": {"Processor": "Intel Core Ultra 9", "GPU": "RTX 4070", "Display": "4K OLED", "RAM": "32GB"}
    },
    {
        "id": "prod-203",
        "name": "Lenovo ThinkPad X1 Carbon Gen 12",
        "category": "Laptops",
        "price": 1899.00,
        "stock": 62,
        "popularity": 81.0,
        "requestFrequency": 390,
        "dataSize": 4300,
        "databaseRetrievalCost": 0.0045,
        "description": "The quintessential business ultralight laptop with carbon fiber chassis and military-grade durability.",
        "imageUrl": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80",
        "specs": {"Weight": "1.09 kg", "CPU": "Intel Core Ultra 7", "Battery": "Up to 15h"}
    },
    {
        "id": "prod-204",
        "name": "ASUS ROG Zephyrus G16",
        "category": "Laptops",
        "price": 2199.99,
        "stock": 48,
        "popularity": 89.0,
        "requestFrequency": 620,
        "dataSize": 4900,
        "databaseRetrievalCost": 0.0045,
        "description": "Ultra-slim CNC aluminum gaming laptop with ROG Nebula OLED 240Hz display.",
        "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80",
        "specs": {"GPU": "RTX 4080 12GB", "Refresh Rate": "240Hz 0.2ms", "Sound": "6-speaker array"}
    },
    {
        "id": "prod-205",
        "name": "MacBook Air 15\" M3",
        "category": "Laptops",
        "price": 1299.00,
        "stock": 130,
        "popularity": 92.5,
        "requestFrequency": 740,
        "dataSize": 4400,
        "databaseRetrievalCost": 0.0045,
        "description": "Impossibly thin design with vibrant 15.3-inch Liquid Retina display and silent fanless architecture.",
        "imageUrl": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
        "specs": {"Chip": "Apple M3 8-core", "Thickness": "11.5 mm", "Battery": "18 hours"}
    },

    # --- Audio & Headphones ---
    {
        "id": "prod-301",
        "name": "Sony WH-1000XM5",
        "category": "Audio",
        "price": 399.99,
        "stock": 210,
        "popularity": 93.0,
        "requestFrequency": 780,
        "dataSize": 3200,
        "databaseRetrievalCost": 0.0045,
        "description": "Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, and LDAC audio.",
        "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
        "specs": {"Noise Cancellation": "Dual Processors", "Battery": "30 Hours", "Codec": "LDAC, AAC, SBC"}
    },
    {
        "id": "prod-302",
        "name": "Apple AirPods Max",
        "category": "Audio",
        "price": 549.00,
        "stock": 85,
        "popularity": 87.0,
        "requestFrequency": 590,
        "dataSize": 3400,
        "databaseRetrievalCost": 0.0045,
        "description": "High-fidelity audio computational sound with custom acoustic design and personalized spatial audio.",
        "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80",
        "specs": {"Driver": "40mm Dynamic", "Canopy": "Knit Mesh", "Transparency": "Adaptive"}
    },
    {
        "id": "prod-303",
        "name": "Bose QuietComfort Ultra",
        "category": "Audio",
        "price": 429.00,
        "stock": 120,
        "popularity": 83.0,
        "requestFrequency": 480,
        "dataSize": 3100,
        "databaseRetrievalCost": 0.0045,
        "description": "Breakthrough spatialized audio with world-class noise cancellation and CustomTune calibration.",
        "imageUrl": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=80",
        "specs": {"Modes": "Quiet, Aware, Immersion", "Battery": "24 hours", "Bluetooth": "5.3"}
    },
    {
        "id": "prod-304",
        "name": "Sennheiser Momentum 4 Wireless",
        "category": "Audio",
        "price": 349.95,
        "stock": 90,
        "popularity": 78.5,
        "requestFrequency": 310,
        "dataSize": 2980,
        "databaseRetrievalCost": 0.0045,
        "description": "Audiophile-inspired 42mm transducer system delivering 60-hour marathon battery life.",
        "imageUrl": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
        "specs": {"Battery": "60 Hours", "Acoustic": "42mm Transducer", "Touch": "Intuitive Gestures"}
    },

    # --- Wearables & Smartwatches ---
    {
        "id": "prod-401",
        "name": "Apple Watch Ultra 2",
        "category": "Wearables",
        "price": 799.00,
        "stock": 115,
        "popularity": 91.0,
        "requestFrequency": 710,
        "dataSize": 3500,
        "databaseRetrievalCost": 0.0045,
        "description": "Rugged 49mm titanium case, 3000-nit display, dual-frequency GPS, and up to 72 hours in Low Power Mode.",
        "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
        "specs": {"Case": "49mm Titanium", "Display": "3000 nits", "Water Resistance": "100m Dive"}
    },
    {
        "id": "prod-402",
        "name": "Garmin Fenix 8 Solar",
        "category": "Wearables",
        "price": 999.99,
        "stock": 60,
        "popularity": 82.0,
        "requestFrequency": 410,
        "dataSize": 3650,
        "databaseRetrievalCost": 0.0045,
        "description": "Multisport GPS smartwatch with solar charging lens, built-in flashlight, and scuba dive capabilities.",
        "imageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80",
        "specs": {"Battery": "Up to 28 days Solar", "Maps": "TopoActive Global", "Sensors": "Pulse Ox"}
    },
    {
        "id": "prod-403",
        "name": "Samsung Galaxy Watch Ultra",
        "category": "Wearables",
        "price": 649.99,
        "stock": 80,
        "popularity": 80.0,
        "requestFrequency": 360,
        "dataSize": 3380,
        "databaseRetrievalCost": 0.0045,
        "description": "Grade 4 titanium casing with 10ATM water resistance and BioActive multi-sensor monitoring.",
        "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80",
        "specs": {"Casing": "Grade 4 Titanium", "Health": "Energy Score & AGEs", "GPS": "Dual Frequency"}
    },
    {
        "id": "prod-404",
        "name": "Oura Ring Gen 3 Horizon",
        "category": "Wearables",
        "price": 349.00,
        "stock": 140,
        "popularity": 85.0,
        "requestFrequency": 510,
        "dataSize": 2800,
        "databaseRetrievalCost": 0.0045,
        "description": "Sleek smart titanium ring monitoring sleep stages, HRV, readiness score, and temperature trends.",
        "imageUrl": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80",
        "specs": {"Material": "Titanium PVD", "Weight": "4 to 6 grams", "Battery": "Up to 7 days"}
    },

    # --- Gaming & Consoles ---
    {
        "id": "prod-501",
        "name": "Sony PlayStation 5 Pro",
        "category": "Gaming",
        "price": 699.99,
        "stock": 180,
        "popularity": 97.0,
        "requestFrequency": 980,
        "dataSize": 4600,
        "databaseRetrievalCost": 0.0045,
        "description": "PlayStation Spectral Super Resolution (PSSR), advanced ray tracing, and 2TB SSD storage.",
        "imageUrl": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
        "specs": {"GPU": "67% more CUs", "SSD": "2TB Custom NVMe", "AI Upscaling": "PSSR 4K 60fps"}
    },
    {
        "id": "prod-502",
        "name": "Nintendo Switch OLED - Mario Red",
        "category": "Gaming",
        "price": 349.99,
        "stock": 150,
        "popularity": 88.0,
        "requestFrequency": 640,
        "dataSize": 3900,
        "databaseRetrievalCost": 0.0045,
        "description": "Vibrant 7-inch OLED screen with wide adjustable stand, enhanced audio, and 64GB storage.",
        "imageUrl": "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=400&q=80",
        "specs": {"Screen": "7.0-inch OLED", "Dock": "Wired LAN Port", "Storage": "64GB Internal"}
    },
    {
        "id": "prod-503",
        "name": "Steam Deck OLED 1TB",
        "category": "Gaming",
        "price": 649.00,
        "stock": 95,
        "popularity": 92.0,
        "requestFrequency": 720,
        "dataSize": 4100,
        "databaseRetrievalCost": 0.0045,
        "description": "90Hz HDR OLED display with 6nm AMD APU, WiFi 6E, and 50Wh battery for AAA handheld gaming.",
        "imageUrl": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80",
        "specs": {"Display": "7.4 90Hz HDR OLED", "APU": "6nm Custom AMD", "Storage": "1TB NVMe SSD"}
    },
    {
        "id": "prod-504",
        "name": "Xbox Series X 2TB Galaxy Black",
        "category": "Gaming",
        "price": 599.99,
        "stock": 70,
        "popularity": 83.5,
        "requestFrequency": 450,
        "dataSize": 4350,
        "databaseRetrievalCost": 0.0045,
        "description": "Special edition console featuring celestial starfield pattern and 2TB high-speed SSD.",
        "imageUrl": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80",
        "specs": {"Compute": "12 Teraflops", "Resolution": "True 4K 120fps", "Storage": "2TB Custom NVMe"}
    },

    # --- Smart Home & Monitors ---
    {
        "id": "prod-601",
        "name": "LG 34\" UltraGear OLED Curved Monitor",
        "category": "Monitors",
        "price": 999.99,
        "stock": 45,
        "popularity": 86.0,
        "requestFrequency": 510,
        "dataSize": 4200,
        "databaseRetrievalCost": 0.0045,
        "description": "800R curved WQHD display with 0.03ms response time and 240Hz refresh rate.",
        "imageUrl": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
        "specs": {"Panel": "34.0 WQHD OLED", "Curve": "800R", "Refresh": "240Hz", "Response": "0.03ms"}
    },
    {
        "id": "prod-602",
        "name": "Apple Studio Display 27\" 5K",
        "category": "Monitors",
        "price": 1599.00,
        "stock": 38,
        "popularity": 82.5,
        "requestFrequency": 390,
        "dataSize": 3950,
        "databaseRetrievalCost": 0.0045,
        "description": "5K Retina display with 12MP Ultra Wide camera with Center Stage and studio-quality 3-mic array.",
        "imageUrl": "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=400&q=80",
        "specs": {"Resolution": "5120 x 2880", "Brightness": "600 nits", "Audio": "6 speakers Spatial"}
    },
    {
        "id": "prod-603",
        "name": "Sonos Era 300 Spatial Speaker",
        "category": "Smart Home",
        "price": 449.00,
        "stock": 70,
        "popularity": 77.0,
        "requestFrequency": 280,
        "dataSize": 3100,
        "databaseRetrievalCost": 0.0045,
        "description": "Revolutionary acoustic architecture with Dolby Atmos and six optimally placed drivers.",
        "imageUrl": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80",
        "specs": {"Spatial Audio": "Dolby Atmos", "Connectivity": "WiFi 6, Bluetooth 5.0", "Tuning": "Trueplay"}
    },
    {
        "id": "prod-604",
        "name": "Philips Hue Starter Kit E26",
        "category": "Smart Home",
        "price": 199.99,
        "stock": 160,
        "popularity": 79.0,
        "requestFrequency": 320,
        "dataSize": 2700,
        "databaseRetrievalCost": 0.0045,
        "description": "16 million colors smart ambiance lighting kit including Hue Bridge and 4 smart bulbs.",
        "imageUrl": "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Lumen": "1100 lm per bulb", "Protocol": "Zigbee + Matter", "Ecosystem": "HomeKit/Alexa"}
    },

    # --- Accessories & Cold Products (Eviction Candidates) ---
    {
        "id": "prod-701",
        "name": "Legacy iPhone 7 Silicone Case (Dust Pink)",
        "category": "Accessories",
        "price": 14.99,
        "stock": 250,
        "popularity": 12.0,
        "requestFrequency": 15,
        "dataSize": 1800,
        "databaseRetrievalCost": 0.0045,
        "description": "Discontinued silicone protective case for older generation iPhone 7 models.",
        "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
        "specs": {"Compatibility": "iPhone 7/8", "Material": "Soft Silicone"}
    },
    {
        "id": "prod-702",
        "name": "Micro-USB to Mini-USB Adapter Pack",
        "category": "Accessories",
        "price": 6.99,
        "stock": 420,
        "popularity": 8.5,
        "requestFrequency": 8,
        "dataSize": 1450,
        "databaseRetrievalCost": 0.0045,
        "description": "Legacy adapter pack for vintage digital cameras, GPS units, and early Android devices.",
        "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Connectors": "Micro-USB Female to Mini-USB Male", "Data": "USB 2.0 480Mbps"}
    },
    {
        "id": "prod-703",
        "name": "VGA to DVI Display Cable 1.8m",
        "category": "Accessories",
        "price": 9.99,
        "stock": 310,
        "popularity": 11.0,
        "requestFrequency": 12,
        "dataSize": 1600,
        "databaseRetrievalCost": 0.0045,
        "description": "Analog monitor interconnect cable for legacy desktop computer setups.",
        "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Pins": "VGA 15-pin to DVI-I", "Shielding": "Ferrite core"}
    },
    {
        "id": "prod-704",
        "name": "CompactFlash 2GB Memory Card",
        "category": "Accessories",
        "price": 18.50,
        "stock": 85,
        "popularity": 6.0,
        "requestFrequency": 5,
        "dataSize": 1500,
        "databaseRetrievalCost": 0.0045,
        "description": "Type I CompactFlash storage card for vintage DSLR cameras and industrial machine tools.",
        "imageUrl": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80",
        "specs": {"Capacity": "2GB", "Speed": "30MB/s", "Format": "FAT16"}
    },
    {
        "id": "prod-705",
        "name": "Universal CD/DVD Cleaning Kit",
        "category": "Accessories",
        "price": 11.99,
        "stock": 190,
        "popularity": 9.0,
        "requestFrequency": 7,
        "dataSize": 1720,
        "databaseRetrievalCost": 0.0045,
        "description": "Optical disc lens cleaner with radial micro-fiber brushes and cleaning solution.",
        "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        "specs": {"Compatibility": "CD, DVD, Blu-ray", "Brush Count": "2 Micro-brushes"}
    },
    {
        "id": "prod-706",
        "name": "FireWire 400 to 800 9-Pin to 6-Pin Cable",
        "category": "Accessories",
        "price": 15.00,
        "stock": 65,
        "popularity": 7.0,
        "requestFrequency": 6,
        "dataSize": 1650,
        "databaseRetrievalCost": 0.0045,
        "description": "IEEE 1394b interface lead for legacy DV camcorders and audio recording interfaces.",
        "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Length": "2.0m", "Standard": "IEEE 1394b"}
    },
    {
        "id": "prod-707",
        "name": "30-Pin Dock to USB Charge Cable (White)",
        "category": "Accessories",
        "price": 8.99,
        "stock": 340,
        "popularity": 10.5,
        "requestFrequency": 11,
        "dataSize": 1550,
        "databaseRetrievalCost": 0.0045,
        "description": "Replacement sync and charging lead for classic iPod and early iPad generations.",
        "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
        "specs": {"Compatibility": "iPod Classic, iPhone 4S", "Length": "1.0m"}
    },
    {
        "id": "prod-708",
        "name": "Serial RS-232 9-Pin DB9 Extension Cable",
        "category": "Accessories",
        "price": 12.49,
        "stock": 110,
        "popularity": 5.0,
        "requestFrequency": 4,
        "dataSize": 1400,
        "databaseRetrievalCost": 0.0045,
        "description": "Straight-through serial communications wire for industrial PLCs and barcode scanners.",
        "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Standard": "RS232 DB9 Male-Female", "Gauge": "28 AWG"}
    },
    {
        "id": "prod-709",
        "name": "Floppy Drive 3.5\" Cleaning Diskette",
        "category": "Accessories",
        "price": 14.00,
        "stock": 45,
        "popularity": 4.0,
        "requestFrequency": 3,
        "dataSize": 1350,
        "databaseRetrievalCost": 0.0045,
        "description": "Magnetic head maintenance disk for legacy 1.44MB floppy disk drives.",
        "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        "specs": {"Media": "1.44MB HD Diskette", "Application": "Internal/External Floppy"}
    },
    {
        "id": "prod-710",
        "name": "PS/2 to USB Keyboard Mouse Adapter",
        "category": "Accessories",
        "price": 7.50,
        "stock": 280,
        "popularity": 9.5,
        "requestFrequency": 9,
        "dataSize": 1500,
        "databaseRetrievalCost": 0.0045,
        "description": "Dual 6-pin mini-DIN active converter for IBM Model M and vintage mechanical keyboards.",
        "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Input": "2x PS/2 Female", "Output": "USB Type-A Male"}
    },
    {
        "id": "prod-711",
        "name": "Universal Stylus for Resistive Touchscreens",
        "category": "Accessories",
        "price": 5.99,
        "stock": 390,
        "popularity": 7.5,
        "requestFrequency": 6,
        "dataSize": 1420,
        "databaseRetrievalCost": 0.0045,
        "description": "Hard plastic tip pointer for legacy POS terminals, signature pads, and GPS navigators.",
        "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
        "specs": {"Tip": "Resistive Polycarbonate", "Tether": "Elastic Coil"}
    },
    {
        "id": "prod-712",
        "name": "Cassette Tape AUX Headphone Adapter",
        "category": "Accessories",
        "price": 9.49,
        "stock": 175,
        "popularity": 11.5,
        "requestFrequency": 14,
        "dataSize": 1600,
        "databaseRetrievalCost": 0.0045,
        "description": "Magnetic audio induction cartridge for classic car cassette decks.",
        "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
        "specs": {"Jack": "3.5mm Gold Plated", "Mechanism": "Spring-loaded Head"}
    },
    {
        "id": "prod-713",
        "name": "Mini-DisplayPort to DVI Converter Dongle",
        "category": "Accessories",
        "price": 13.99,
        "stock": 220,
        "popularity": 12.5,
        "requestFrequency": 16,
        "dataSize": 1700,
        "databaseRetrievalCost": 0.0045,
        "description": "Single-link active adapter for older MacBook Pro and iMac external displays.",
        "imageUrl": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
        "specs": {"Input": "Mini DisplayPort 1.2", "Output": "DVI-D Female 1080p"}
    },
    {
        "id": "prod-714",
        "name": "Old Phone Anti-Dust 3.5mm Silicone Plugs (10-Pack)",
        "category": "Accessories",
        "price": 3.99,
        "stock": 600,
        "popularity": 5.5,
        "requestFrequency": 4,
        "dataSize": 1200,
        "databaseRetrievalCost": 0.0045,
        "description": "Soft silicone earphone port protective caps.",
        "imageUrl": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
        "specs": {"Quantity": "10 Pieces", "Material": "Food Grade Silicone"}
    }
]

class ProductDatabase:
    def __init__(self):
        self.products: Dict[str, Dict] = {p["id"]: dict(p) for p in SEED_PRODUCTS}
        # Set initial access timestamps
        base_time = time.time()
        for p in self.products.values():
            p["lastAccessed"] = base_time - (100 - p["popularity"]) * 60

    async def fetch_product_by_id(self, product_id: str, simulate_delay: bool = True) -> Optional[Dict]:
        """
        Simulates querying the actual database layer.
        Adds realistic database query latency (30 - 45 ms).
        """
        if product_id not in self.products:
            return None
        
        if simulate_delay:
            # Simulate real cloud database query latency (e.g. MongoDB/MySQL roundtrip)
            await asyncio.sleep(0.035)

        prod = dict(self.products[product_id])
        prod["lastAccessed"] = time.time()
        return prod

    def get_all_products(self) -> List[Dict]:
        return list(self.products.values())

    def get_product_count(self) -> int:
        return len(self.products)

    def reset_catalog(self):
        self.products = {p["id"]: dict(p) for p in SEED_PRODUCTS}
        base_time = time.time()
        for p in self.products.values():
            p["lastAccessed"] = base_time - (100 - p["popularity"]) * 60

# Singleton instance
db_instance = ProductDatabase()
