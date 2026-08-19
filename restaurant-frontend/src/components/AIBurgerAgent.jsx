// src/components/AIBurgerAgent.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Zap, Flame, Heart, Award, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AIBurgerAgent = ({ layers, setLayers, defaultLayers, setIsExploded, ingredientsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiScore, setAiScore] = useState(85);
  const [aiComment, setAiComment] = useState('');
  const [recommendedAction, setRecommendedAction] = useState(null);

  // Recettes générées par l'IA (Chef IA 3D)
  const aiRecipes = [
    {
      id: 'ai-supreme',
      name: '✨ L\'Explosion Gourmet Suprême (IA Signature)',
      badge: 'Score IA : 99/100',
      description: 'L\'équilibre parfait calculé par algorithme : Double Steak, Double Cheddar, Oignons rouges croquants, Tomates juteuses et Sauce Burger sur Pain Brioché.',
      layers: [
        { id: 'bun-top-ai-1', name: 'Pain brioché', price: 1.25, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80', isBun: true, isTopBun: true },
        { id: 'sauce-ai-1', name: 'Sauce burger', price: 0.60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-1', name: 'Oignons rouges', price: 0.50, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-2', name: 'Tomates', price: 0.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-3', name: 'Laitue', price: 0.50, image: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&w=800&q=80' },
        { id: 'cheese-ai-1', name: 'Double Cheddar', price: 2.20, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
        { id: 'meat-ai-1', name: 'Double Steak', price: 6.50, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-4', name: 'Cornichons', price: 0.50, image: 'https://images.unsplash.com/photo-1589621316382-008457b855dd?auto=format&fit=crop&w=800&q=80' },
        { id: 'bun-bot-ai-1', name: 'Pain brioché', price: 1.25, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80', isBun: true, isBottomBun: true },
      ],
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 'ai-carnivore',
      name: '🔥 Le Carnivore Barbecue 3D (IA Beast Mode)',
      badge: '100% Protéines',
      description: 'Pour les amateurs de viande fumée : Steak haché, Poulet pané croustillant, Bacon grillé, Cheddar et Sauce BBQ artisanale.',
      layers: [
        { id: 'bun-top-ai-2', name: 'Pain sésame', price: 1.25, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80', isBun: true, isTopBun: true },
        { id: 'sauce-ai-2', name: 'BBQ', price: 0.60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80' },
        { id: 'extra-ai-1', name: 'Bacon croustillant', price: 1.80, image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=800&q=80' },
        { id: 'cheese-ai-2', name: 'Cheddar', price: 1.50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
        { id: 'meat-ai-2', name: 'Poulet pané', price: 5.00, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80' },
        { id: 'cheese-ai-3', name: 'Raclette', price: 2.50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
        { id: 'meat-ai-3', name: 'Steak haché', price: 4.50, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-5', name: 'Oignons frits', price: 0.80, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80' },
        { id: 'bun-bot-ai-2', name: 'Pain sésame', price: 1.25, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80', isBun: true, isBottomBun: true },
      ],
      color: 'from-red-600 to-orange-600'
    },
    {
      id: 'ai-veggie',
      name: '🌱 Le Miracle Végétal 3D (IA Healthy Bio)',
      badge: 'Fraîcheur & Santé',
      description: 'Une explosion de fraîcheur végétale : Galette Veggie maison, Avocat frais, Chèvre rôti, Laitue croquante et Mayonnaise légère.',
      layers: [
        { id: 'bun-top-ai-3', name: 'Pain complet', price: 1.40, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', isBun: true, isTopBun: true },
        { id: 'sauce-ai-3', name: 'Mayo', price: 0.50, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80' },
        { id: 'extra-ai-2', name: 'Avocat frais', price: 1.50, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-6', name: 'Tomates', price: 0.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
        { id: 'veg-ai-7', name: 'Laitue', price: 0.50, image: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&w=800&q=80' },
        { id: 'cheese-ai-4', name: 'Chèvre rôti', price: 2.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
        { id: 'meat-ai-4', name: 'Galette Veggie', price: 4.50, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80' },
        { id: 'bun-bot-ai-3', name: 'Pain complet', price: 1.40, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', isBun: true, isBottomBun: true },
      ],
      color: 'from-green-600 to-emerald-500'
    }
  ];

  // Analyse gastronomique en temps réel par l'IA
  useEffect(() => {
    if (!layers || layers.length === 0) return;

    let score = 70;
    let comment = '';
    let action = null;

    const hasMeat = layers.some(l => l.name.includes('Steak') || l.name.includes('Poulet') || l.name.includes('Veggie'));
    const hasCheese = layers.some(l => l.name.includes('Cheddar') || l.name.includes('Raclette') || l.name.includes('Chèvre'));
    const hasVeggie = layers.some(l => l.name.includes('Laitue') || l.name.includes('Tomates') || l.name.includes('Oignons') || l.name.includes('Cornichons'));
    const hasSauce = layers.some(l => l.name.includes('Sauce') || l.name.includes('Mayo') || l.name.includes('Ketchup') || l.name.includes('BBQ'));
    const meatCount = layers.filter(l => l.name.includes('Steak') || l.name.includes('Poulet') || l.name.includes('Veggie')).length;

    if (hasMeat && hasCheese && hasVeggie && hasSauce) {
      score = 98;
      comment = '👨‍🍳 Chef IA : Chef-d\'œuvre absolu ! Équilibre parfait entre textures fondantes, protéines savoureuses et fraîcheur croquante. C\'est un burger dignement étoilé !';
    } else if (!hasVeggie) {
      score = 78;
      comment = '💡 Conseil Chef IA : Votre burger est très gourmand, mais il manque un peu de croquant ! L\'IA vous conseille d\'ajouter des Oignons rouges ou des Tomates.';
      action = {
        label: '✨ Laisser l\'IA ajouter Tomates & Laitue',
        apply: () => {
          const newLayers = [...layers];
          // Insérer juste au-dessus de la viande
          const meatIdx = newLayers.findIndex(l => l.name.includes('Steak') || l.name.includes('Poulet') || l.name.includes('Veggie'));
          const targetIdx = meatIdx !== -1 ? meatIdx : newLayers.length - 1;
          newLayers.splice(targetIdx, 0, 
            { id: `ai-add-tom-${Date.now()}`, name: 'Tomates', price: 0.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
            { id: `ai-add-let-${Date.now()}`, name: 'Laitue', price: 0.50, image: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&w=800&q=80' }
          );
          setLayers(newLayers);
          setIsExploded(true);
          toast.success('✨ Chef IA a généré le modèle réel avec Tomates & Laitue !', { icon: '🤖' });
        }
      };
    } else if (!hasSauce) {
      score = 74;
      comment = '⚠️ Alerte Juteuse IA : Attention, un burger sans sauce risque d\'être un peu sec ! L\'IA recommande d\'ajouter notre Sauce Burger maison.';
      action = {
        label: '✨ Laisser l\'IA ajouter de la Sauce Burger',
        apply: () => {
          const newLayers = [...layers];
          newLayers.splice(1, 0, { id: `ai-add-sauce-${Date.now()}`, name: 'Sauce burger', price: 0.60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80' });
          setLayers(newLayers);
          setIsExploded(true);
          toast.success('✨ Chef IA a généré le modèle réel avec la Sauce Burger !', { icon: '🤖' });
        }
      };
    } else if (meatCount > 2) {
      score = 92;
      comment = '🔥 Chef IA (Beast Mode) : Attention, énorme stack de protéines ! Pensez à ajouter du Double Cheddar pour bien lier l\'ensemble en fondant.';
      action = {
        label: '✨ Laisser l\'IA ajouter du Double Cheddar',
        apply: () => {
          const newLayers = [...layers];
          const meatIdx = newLayers.findIndex(l => l.name.includes('Steak') || l.name.includes('Poulet') || l.name.includes('Veggie'));
          newLayers.splice(meatIdx !== -1 ? meatIdx : 1, 0, { id: `ai-add-che-${Date.now()}`, name: 'Double Cheddar', price: 2.20, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' });
          setLayers(newLayers);
          setIsExploded(true);
          toast.success('✨ Chef IA a généré le modèle réel avec Double Cheddar !', { icon: '🤖' });
        }
      };
    } else {
      score = 88;
      comment = '👨‍🍳 Chef IA : Belle composition ! Vous pouvez explorer nos extras comme le Bacon croustillant ou l\'Avocat pour une touche d\'exception.';
    }

    setAiScore(score);
    setAiComment(comment);
    setRecommendedAction(action);
  }, [layers, setLayers, setIsExploded]);

  const applyRecipe = (recipe) => {
    setIsAnalyzing(true);
    toast.loading('🤖 Chef IA génère le modèle réel 3D de votre burger...', { id: 'ai-recipe' });
    
    setTimeout(() => {
      setLayers(recipe.layers);
      setIsExploded(true);
      setIsAnalyzing(false);
      toast.success(`🎉 ${recipe.name} chargé avec succès !`, { id: 'ai-recipe', icon: '✨' });
    }, 600);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#181824] via-[#201C2B] to-[#181824] border-2 border-[#F59E0B]/50 rounded-3xl p-4 sm:p-6 mb-6 shadow-[0_15px_35px_rgba(245,158,11,0.15)] relative overflow-hidden group">
      {/* Effet lumineux IA en arrière-plan */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#F59E0B]/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
      
      {/* En-tête de l'Agent IA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F59E0B] via-amber-600 to-yellow-500 flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-amber-500/30 animate-pulse">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white font-heading tracking-wide flex items-center gap-2">
                CHEF IA <span className="text-[#F59E0B]">AGENT 3D</span>
              </h3>
              <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-[#F59E0B] text-[#F59E0B] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" /> ACTIF & INTELLIGENT
              </span>
            </div>
            <p className="text-xs text-gray-300">Votre sommelier gastronomique qui génère et optimise vos burgers avec précision IA</p>
          </div>
        </div>

        {/* Score Gourmet de l'IA */}
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 shadow-inner">
          <Award className={`w-6 h-6 ${aiScore >= 90 ? 'text-[#F59E0B]' : 'text-amber-400'}`} />
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Score Gourmet IA</div>
            <div className="text-base sm:text-lg font-black text-white flex items-baseline gap-1">
              <span className={aiScore >= 90 ? 'text-[#F59E0B]' : 'text-white'}>{aiScore}</span>
              <span className="text-xs text-gray-500 font-normal">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message de recommandation et d'analyse en temps réel */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
          <span className="text-xl">👨‍🍳</span>
          <span>{aiComment}</span>
        </div>
        {recommendedAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={recommendedAction.apply}
            className="w-full sm:w-auto bg-gradient-to-r from-[#F59E0B] to-amber-600 text-black font-black text-xs px-4 py-2 rounded-xl shadow-lg hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{recommendedAction.label}</span>
          </motion.button>
        )}
      </div>

      {/* Recettes Signatures en 1 Clic par l'IA */}
      <div className="relative z-10">
        <div className="text-xs font-black text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-[#F59E0B]" />
          <span>Créations Signatures en 1 Clic (Générées par l'Algorithme IA 3D) :</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {aiRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => applyRecipe(recipe)}
              className="bg-black/50 hover:bg-black/80 border border-white/15 hover:border-[#F59E0B] rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between group/card relative overflow-hidden shadow-md hover:shadow-xl"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${recipe.color} opacity-10 rounded-full blur-xl group-hover/card:opacity-30 transition-opacity`} />
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black text-[#F59E0B] px-2 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30">
                    {recipe.badge}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400 group-hover/card:text-white transition-colors">
                    {recipe.layers.length} couches
                  </span>
                </div>
                <h4 className="font-heading font-black text-sm text-white group-hover/card:text-[#F59E0B] transition-colors mb-1.5 line-clamp-1">
                  {recipe.name}
                </h4>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
                  {recipe.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-bold text-[#F59E0B]">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Générer en 3D
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover/card:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIBurgerAgent;
