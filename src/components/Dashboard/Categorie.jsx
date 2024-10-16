import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

const categories = [
    { name: "Beauty & Personal Care", icon: "🧴", subcategories: ["Makeup", "Skincare", "Hair Care", "Fragrance", "Personal Care"] },
    { name: "Computers", icon: "💻", subcategories: ["Laptops", "Desktops", "Tablets", "Computer Accessories"] },
    { name: "Electronics", icon: "🔌", badge: "Sale", subcategories: ["Headphones", "Home Audio", "Office Electronics", "Portable Audio & Video", "Security & Surveillance", "Television & Video", "Video Game Consoles", "Video Projectors", "Wearable Technology"] },
    { name: "Women's Fashion", icon: "👚", subcategories: ["Clothing", "Shoes", "Jewelry", "Watches", "Handbags"] },
    { name: "Men's Fashion", icon: "👔", subcategories: ["Clothing", "Shoes", "Watches", "Accessories"] },
    { name: "Health & Household", icon: "🏠", subcategories: ["Vitamins & Dietary Supplements", "Medical Supplies & Equipment", "Household Supplies"] },
    { name: "Home & Kitchen", icon: "🍳", subcategories: ["Kitchen & Dining", "Bedding", "Bath", "Furniture", "Home Decor"] },
    { name: "Industrial & Scientific", icon: "🔬", subcategories: ["Lab & Scientific", "Industrial Power & Hand Tools", "Janitorial & Sanitation Supplies"] },
    { name: "Pet Supplies", icon: "🐾", badge: "New", subcategories: ["Dogs", "Cats", "Fish & Aquatic Pets", "Birds", "Horses"] },
    { name: "Sports & Outdoors", icon: "⚽", subcategories: ["Exercise & Fitness", "Outdoor Recreation", "Sports"] },
    { name: "Tools", icon: "🔧", subcategories: ["Power Tools", "Hand Tools", "Tool Storage & Organization"] },
]


const Categorie = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null)


    return (
        <nav>
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredCategory(index)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center py-2 px-4 hover:bg-gray-100">
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                            {category.badge && (
                                <Badge variant="secondary" className="ml-2">
                                    {category.badge}
                                </Badge>
                            )}
                            <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                        {hoveredCategory === index && (
                            <div className="absolute left-full top-0 w-48 bg-white shadow-lg z-10">
                                <ul>
                                    {category.subcategories.map((subcategory, subIndex) => (
                                        <li key={subIndex}>
                                            <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`} className="block py-2 px-4 hover:bg-gray-100">
                                                {subcategory}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Button variant="ghost" className="w-full mt-4">
                See all categories
                <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </nav>
    )
}

export default Categorie  