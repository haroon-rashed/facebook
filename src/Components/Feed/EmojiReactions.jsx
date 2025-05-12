import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiThumbsUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addReactionData } from '../../features/posts/postSlice';

const EmojiReactions = ({ post_id }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [hoveredReaction, setHoveredReaction] = useState(null);

  const reactions = [
    { id: 'like', emoji: '👍', label: 'Like', color: '#1877f2' },
    { id: 'love', emoji: '❤️', label: 'Love', color: '#f33e58' },
    { id: 'haha', emoji: '😂', label: 'Haha', color: '#f7b125' },
    { id: 'wow', emoji: '😮', label: 'Wow', color: '#f7b125' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: '#f7b125' },
    { id: 'angry', emoji: '😡', label: 'Angry', color: '#e9710f' }
  ];

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
    setShowPicker(false);
    
    const reactionData = {
      post_id,
      user_id: user._id,
      type: reaction.id // Send the reaction ID ("like", "love", etc.)
    };
    
    console.log("Dispatching reaction:", reactionData);
    dispatch(addReactionData(reactionData));
  };

  const handleMouseLeave = () => {
    if (!selectedReaction) {
      setShowPicker(false);
    }
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
              className="text-2xl"
              style={{ color: selectedReaction.color }}
            >
              {selectedReaction.emoji}
            </motion.div>
          ) : (
            <FiThumbsUp className="text-gray-600 cursor-pointer" />
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