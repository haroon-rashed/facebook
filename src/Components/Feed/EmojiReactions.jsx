import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiThumbsUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addReactionData } from '../../features/posts/postSlice';

const EmojiReactions = ({ post_id, likes }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [hoveredReaction, setHoveredReaction] = useState(null);

  const reactions = [
    { id: 'like', emoji: '👍', label: 'like', color: '#1877f2' },
    { id: 'love', emoji: '❤️', label: 'love', color: '#f33e58' },
    { id: 'haha', emoji: '😂', label: 'haha', color: '#f7b125' },
    { id: 'wow', emoji: '😮', label: 'wow', color: '#f7b125' },
    { id: 'sad', emoji: '😢', label: 'sad', color: '#f7b125' },
    { id: 'angry', emoji: '😡', label: 'angry', color: '#e9710f' }
  ];

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
    setShowPicker(false);
    
    const reactionData = {
      post_id,
      user_id: user._id,
      type: reaction.id 
    };
    
    console.log("Dispatching reaction:", reactionData);
    dispatch(addReactionData(reactionData));
  };

  const isPresent = likes.find((item) => item.id == user?._id);
  const userReaction = reactions.find(r => r.id === isPresent?.type);

  const handleMouseLeave = () => {
    if (!selectedReaction) {
      setShowPicker(false);
    }
  };

  // Emoji images mapping
  const emojiImages = {
    wow: (
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62f/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62f/512.gif" alt="😯" width="24" height="24"/>
      </picture>
    ),
    like: (
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.gif" alt="👍" width="24" height="24"/>
      </picture>
    ),
    love: (
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif" alt="❤" width="24" height="24"/>
      </picture>
    ),
    haha: (
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/512.gif" alt="😆" width="24" height="24"/>
      </picture>
    ),
    angry: (
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.gif" alt="😡" width="24" height="24"/>
      </picture>
    ),
    sad: (
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f61f/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f61f/512.gif" alt="😟" width="24" height="24"/>
      </picture>
    )
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center"
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`flex items-center justify-center p-1 rounded-full transition-colors ${selectedReaction ? '' : 'hover:bg-gray-100'}`}
          onClick={() => setShowPicker(!showPicker)}
        >
          {selectedReaction ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
              style={{ color: selectedReaction.color }}
            >
              <span className="text-2xl">{selectedReaction.emoji}</span>
              <span className="font-semibold text-sm capitalize text-gray-600">{selectedReaction.label}</span>
            </motion.div>
          ) : isPresent ? (
            <motion.div
              className="flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {emojiImages[isPresent.type]}
              </span>
              <span className="font-semibold text-sm capitalize text-gray-600">
                {userReaction?.label}
              </span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1">
              <FiThumbsUp className="text-gray-600 cursor-pointer" />
              <span className="font-semibold text-sm text-gray-600">Like</span>
            </div>
          )}
        </button>

        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg p-1 flex"
              onMouseLeave={() => setShowPicker(false)}
            >
              {reactions.map((reaction) => (
                <motion.div
                  key={reaction.id}
                  className="mx-1 relative"
                  onMouseEnter={() => setHoveredReaction(reaction)}
                  onMouseLeave={() => setHoveredReaction(null)}
                  whileHover={{ y: -10, scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    onClick={() => handleReaction(reaction)}
                    className="text-2xl transition-transform duration-100"
                  >
                    {reaction.emoji}
                  </button>
                  {hoveredReaction?.id === reaction.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                    >
                      {reaction.label}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmojiReactions;