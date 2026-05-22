import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Paperclip, Code, Sun, Moon, 
  Sparkles, BookOpen, Terminal, Cpu, Play, Copy, 
  Check, MessageSquare, ChevronRight, Zap, Trophy, 
  HelpCircle, Flame, Plus, History, RefreshCw 
} from 'lucide-react';
import './CodingPrep.css';

// SVG Icon Helper for Left Sidebar Concepts
const getConceptIcon = (name) => {
  switch (name) {
    case 'Arrays':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'Strings':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M16 4h4v16h-4M8 20H4V4h4M12 4v16" />
        </svg>
      );
    case 'Linked Lists':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4M15 7h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4M8 12h8" />
        </svg>
      );
    case 'Stacks':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="20" x2="20" y2="20" />
          <line x1="6" y1="15" x2="18" y2="15" />
          <line x1="6" y1="10" x2="18" y2="10" />
          <line x1="8" y1="5" x2="16" y2="5" />
        </svg>
      );
    case 'Queues':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />
          <polyline points="15 6 21 12 15 18" />
        </svg>
      );
    case 'Trees':
    case 'Binary Trees':
    case 'BST':
    case 'Segment Trees':
    case 'Tries':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="5" r="3" />
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="10.5" y1="7.5" x2="7.5" y2="16.5" />
          <line x1="13.5" y1="7.5" x2="16.5" y2="16.5" />
        </svg>
      );
    case 'Heaps':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="4" r="2.5" />
          <circle cx="6" cy="11" r="2.5" />
          <circle cx="18" cy="11" r="2.5" />
          <circle cx="12" cy="19" r="2.5" />
          <line x1="10.5" y1="6" x2="7.5" y2="9.5" />
          <line x1="13.5" y1="6" x2="16.5" y2="9.5" />
          <line x1="9.5" y1="13" x2="11" y2="16.5" />
          <line x1="14.5" y1="13" x2="13" y2="16.5" />
        </svg>
      );
    case 'Hash Maps':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      );
    case 'Graphs':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="9" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.5" y1="7.8" x2="15.5" y2="6.2" />
          <line x1="18" y1="8" x2="18" y2="16" />
          <line x1="8.5" y1="10.2" x2="15.5" y2="17.8" />
        </svg>
      );
    case 'Dynamic Programming':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 11h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
          <path d="M11 3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
        </svg>
      );
    case 'Greedy Algorithms':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 8 16 12 12 16 12 8" />
          <line x1="8" y1="12" x2="12" y2="12" />
        </svg>
      );
    case 'Backtracking':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
        </svg>
      );
    case 'Sliding Window':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="7" width="18" height="10" rx="1" />
          <rect x="7" y="7" width="10" height="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'Recursion':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M21.34 8a10 10 0 1 0-.5 4.5" />
        </svg>
      );
    case 'Bit Manipulation':
      return (
        <svg className="concept-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 6h4M12 4v4M6 18v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
    default:
      return <Code className="concept-icon" size={16} />;
  }
};

// SVG Line Chart Component for Progress Tracker
const ProgressChart = () => {
  return (
    <div className="svg-chart-container">
      <svg viewBox="0 0 300 100" className="progress-svg">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(139, 92, 246, 0.08)" strokeWidth="1" />
        <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(139, 92, 246, 0.08)" strokeWidth="1" />
        <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(139, 92, 246, 0.08)" strokeWidth="1" />

        {/* Area fill */}
        <path 
          d="M 10 90 L 10 70 Q 50 80, 90 55 T 170 65 T 230 40 T 290 25 L 290 90 Z" 
          fill="url(#chartGradient)" 
        />
        
        {/* Smooth line path */}
        <path 
          d="M 10 70 Q 50 80, 90 55 T 170 65 T 230 40 T 290 25" 
          fill="none" 
          stroke="#8b5cf6" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
        
        {/* Connection Points */}
        <circle cx="10" cy="70" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="2.5" />
        <circle cx="90" cy="55" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="2.5" />
        <circle cx="170" cy="65" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="2.5" />
        <circle cx="230" cy="40" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="2.5" />
        <circle cx="290" cy="25" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

// Syntax Highlighter Utility
const highlightCode = (code, language) => {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const comments = [];
  const isPythonOrSql = language === 'python' || language === 'sql';
  
  if (isPythonOrSql) {
    html = html.replace(/(#.*)/g, (match) => {
      comments.push(match);
      return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`;
    });
  } else {
    html = html.replace(/(\/\/.*)/g, (match) => {
      comments.push(match);
      return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`;
    });
  }

  const strings = [];
  html = html.replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|`(?:\\`|[^`])*`)/g, (match) => {
    strings.push(match);
    return `__STRING_PLACEHOLDER_${strings.length - 1}__`;
  });

  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'elif', 'for', 'while', 
    'import', 'export', 'class', 'def', 'in', 'and', 'or', 'not', 'try', 
    'except', 'from', 'as', 'true', 'false', 'null', 'None', 'public', 'private', 
    'void', 'int', 'double', 'float', 'char', 'string', 'boolean', 'new', 'this', 
    'static', 'final', 'select', 'from', 'where', 'join', 'insert', 'update', 'delete', 
    'create', 'table', 'index', 'self', 'and', 'or'
  ];
  
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  html = html.replace(keywordRegex, '<span class="code-keyword">$1</span>');
  html = html.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');

  const builtins = [
    'console', 'log', 'print', 'len', 'range', 'Map', 'Set', 'Array', 'List', 
    'dict', 'set', 'tuple', 'sys', 'os', 'math', 'vector', 'std', 'cout', 'cin', 
    'endl', 'String', 'Integer', 'System', 'out', 'println'
  ];
  const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
  html = html.replace(builtinRegex, '<span class="code-builtin">$1</span>');

  html = html.replace(/__STRING_PLACEHOLDER_(\d+)__/g, (_, idx) => {
    const original = strings[parseInt(idx)];
    return `<span class="code-string">${original}</span>`;
  });

  html = html.replace(/__COMMENT_PLACEHOLDER_(\d+)__/g, (_, idx) => {
    const original = comments[parseInt(idx)];
    return `<span class="code-comment">${original}</span>`;
  });

  return html;
};

// Render Fenced Code Blocks with Copy button and Line Numbers
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlightCode(code, language);
  const lines = code.split('\n');

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-language">Code ({language || 'python'}):</span>
        <button className="copy-code-btn" onClick={handleCopy}>
          {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : ''}</span>
        </button>
      </div>
      <div className="code-block-content">
        <div className="line-numbers">
          {lines.map((_, i) => (
            <span key={i} className="line-number">{i + 1}</span>
          ))}
        </div>
        <pre className="code-pre">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
};

// Custom Markdown Inline Parser
const formatInlineMarkdown = (text) => {
  if (!text) return '';
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
  formatted = formatted.replace(/^\s*[-*]\s+(.*)$/gm, '<li class="chat-list-item">$1</li>');
  formatted = formatted.replace(/\n/g, '<br />');
  
  return formatted;
};

// Custom Markdown Render Area
const parseMessageText = (text) => {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const match = part.match(/```(\w*)\n([\s\S]*?)```/);
      const language = match ? match[1] : 'python';
      const code = match ? match[2].trim() : part.slice(3, -3).trim();
      return <CodeBlock key={index} code={code} language={language} />;
    } else {
      return <div key={index} className="msg-text-paragraph" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(part) }} />;
    }
  });
};

const CodingPrep = ({ setCurrentView, theme, setTheme }) => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: `👋 **Welcome to Coding Prep!**\nAsk me any coding question, request a problem, or get help with your code.\nHow can I assist you today?`,
      time: '10:30 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState('Arrays');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState('All');
  
  const chatBottomRef = useRef(null);
  const textInputRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (forcedText = '') => {
    const textToSend = forcedText.trim() || input.trim();
    if (!textToSend) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: textToSend, time: currentTime };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call API with mock fallback
    try {
      const updatedMessages = [...messages, userMsg];
      const response = await fetch('http://127.0.0.1:5000/api/placement-prep/coding/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      });

      const data = await response.json();
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response.ok && data.response) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.response, time: botTime }]);
      } else {
        throw new Error("Server error or invalid response format");
      }
    } catch (e) {
      console.warn("Backend API call failed, falling back to simulated AI response:", e);
      // Simulate mock reply with local logic
      setTimeout(() => {
        const reply = generateMockBotReply(textToSend);
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [...prev, { sender: 'bot', text: reply, time: botTime }]);
        setIsLoading(false);
      }, 1000);
      return;
    }
    setIsLoading(false);
  };

  const generateMockBotReply = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('two sum')) {
      return `### Two Sum Solution\nThe **Two Sum** problem asks us to find two numbers in an array that add up to a specific target.\n\nHere is an efficient $O(N)$ time solution using a Hash Map in Python:\n\n\`\`\`python\ndef two_sum(nums, target):\n    # Map to store elements and their indices\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []\n\`\`\`\n\n**Approach**:\n1. Initialize an empty hash map.\n2. Iterate through each element in the array.\n3. Calculate the complement (\`target - num\`).\n4. Check if the complement is already in the hash map. If yes, return their indices.\n5. If not, add the current number and its index to the hash map.`;
    }
    
    if (q.includes('two pointer') || q.includes('two-pointer')) {
      return `### Two Pointer Technique\nThe two pointer technique is used to solve problems by using two pointers that traverse a data structure to find a solution more efficiently.\n\n**Example**: Find Pair with Target Sum in Sorted Array\n\n**Approach**:\n1. Initialize one pointer at the beginning (\`left\`) and another at the end (\`right\`).\n2. Calculate the sum of the two elements.\n3. If the sum is equal to the target, return the pair.\n4. If the sum is less than the target, move the left pointer right.\n5. If the sum is greater than the target, move the right pointer left.\n\n**Code (Python)**:\n\`\`\`python\ndef pair_with_target(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        curr_sum = arr[left] + arr[right]\n        if curr_sum == target:\n            return [arr[left], arr[right]]\n        elif curr_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return None\n\`\`\``;
    }

    if (q.includes('recursion')) {
      return `### How Recursion Works\nRecursion is a programming concept where a function calls itself directly or indirectly to solve a problem.\n\nEvery recursive function must have two key elements:\n- **Base Case**: The condition under which the function stops calling itself, preventing infinite loops.\n- **Recursive Step**: The part where the function calls itself with a simpler version of the problem.\n\nHere is a classic recursive function to calculate factorial:\n\`\`\`python\ndef factorial(n):\n    # Base Case\n    if n <= 1:\n        return 1\n    # Recursive Step\n    return n * factorial(n - 1)\n\`\`\``;
    }

    if (q.includes('lru cache')) {
      return `### LRU Cache Implementation\nAn **LRU (Least Recently Used) Cache** discards the least recently used items first when the cache reaches its capacity limit.\n\nWe can implement it in Python using a Doubly Linked List and a Hash Map to achieve $O(1)$ operations:\n\n\`\`\`python\nclass Node:\n    def __init__(self, key, value):\n        self.key = key\n        self.value = value\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = {}  # maps key to Node\n        self.head = Node(0, 0)\n        self.tail = Node(0, 0)\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def _remove(self, node):\n        p = node.prev\n        n = node.next\n        p.next = n\n        n.prev = p\n\n    def _add(self, node):\n        p = self.tail.prev\n        p.next = node\n        node.prev = p\n        node.next = self.tail\n        self.tail.prev = node\n\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            node = self.cache[key]\n            self._remove(node)\n            self._add(node)\n            return node.value\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self._remove(self.cache[key])\n        node = Node(key, value)\n        self._add(node)\n        self.cache[key] = node\n        if len(self.cache) > self.capacity:\n            lru = self.head.next\n            self._remove(lru)\n            del self.cache[lru.key]\n\`\`\``;
    }

    if (q.includes('dijkstra')) {
      return `### Dijkstra's Algorithm Explanation\n**Dijkstra's Algorithm** is used to find the shortest paths between nodes in a weighted graph.\n\n**Algorithm Walkthrough**:\n1. Mark all nodes unvisited. Create a set of all the unvisited nodes.\n2. Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.\n3. Set the initial node as current.\n4. For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node.\n5. When we are done considering all of the unvisited neighbors of the current node, mark the current node as visited.\n6. Select the unvisited node that is marked with the smallest tentative distance, set it as the new current node, and repeat.`;
    }

    return `I am your AI Coding Assistant. I can help you with:\n- Practicing Data Structures & Algorithms (\`${selectedConcept || 'Arrays'}\` is selected)\n- Writing code in various languages\n- Explaining code blocks and system design concepts\n\nAsk me a specific question, or select one of the suggested problems on the right!`;
  };

  const handleConceptSelect = (concept) => {
    setSelectedConcept(concept);
    const text = `Explain the concept of **${concept}** and give me a practice DSA problem.`;
    setInput(text);
    textInputRef.current?.focus();
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    const text = `Let's write some code in **${lang}**. Give me a coding challenge to write.`;
    setInput(text);
    textInputRef.current?.focus();
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    const text = `Give me a ${level} difficulty programming question to practice.`;
    setInput(text);
    textInputRef.current?.focus();
  };

  const handleQuickAction = (action) => {
    let queryText = '';
    switch (action) {
      case 'Generate Problem':
        queryText = `Generate an interview-grade DSA problem under the category **${selectedConcept}**.`;
        break;
      case 'Explain Code':
        queryText = `Explain this code piece and analyze its Time & Space Complexity:\n\n\`\`\`python\n# Paste code here\n\`\`\``;
        break;
      case 'Debug Code':
        queryText = `Help me debug my code. Here is the code and the error:\n\n\`\`\`python\n# Paste code here\n\`\`\``;
        break;
      case 'Mock Interview':
        queryText = `Start a Mock Coding Interview. Ask me a question and evaluate my solution step-by-step.`;
        break;
      default:
        return;
    }
    setInput(queryText);
    textInputRef.current?.focus();
  };

  const handleProblemClick = (problemName) => {
    handleSend(`Explain how to solve the '${problemName}' problem and provide an optimized solution.`);
  };

  const handleRecentClick = (questionText) => {
    handleSend(questionText);
  };

  // Static items matching the mockup exactly
  const dsaConceptsList = [
    'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Trees',
    'Binary Trees', 'BST', 'Heaps', 'Hash Maps', 'Graphs', 'Dynamic Programming',
    'Greedy Algorithms', 'Backtracking', 'Sliding Window', 'Recursion',
    'Bit Manipulation', 'Tries', 'Segment Trees'
  ];

  const languagesList = ['Python', 'C++', 'Java', 'SQL'];
  const interviewLevels = ['Easy', 'Medium', 'Hard'];
  const quickActionsList = ['Generate Problem', 'Explain Code', 'Debug Code', 'Mock Interview'];

  const suggestedProblemsList = [
    { name: 'Two Sum', diff: 'Easy' },
    { name: 'Container With Most Water', diff: 'Medium' },
    { name: 'Longest Substring Without Repeating...', diff: 'Medium' },
    { name: 'Merge k Sorted Lists', diff: 'Hard' },
    { name: 'Trapping Rain Water', diff: 'Hard' }
  ];

  const recentQuestionsList = [
    { text: 'Explain two pointer technique', time: '10:30 AM' },
    { text: 'How does recursion work?', time: 'Yesterday' },
    { text: 'LRU Cache implementation', time: '2 days ago' },
    { text: 'Dijkstra\'s algorithm explanation', time: '3 days ago' }
  ];

  const filteredProblems = suggestedProblemsList.filter(p => {
    if (selectedDifficultyFilter === 'All') return true;
    return p.diff === selectedDifficultyFilter;
  });

  return (
    <div className="coding-prep-container">
      {/* LEFT PANEL: NAVIGATION & CONCEPTS SIDEBAR */}
      <aside className="workspace-left-sidebar">
        <button className="back-btn-premium" onClick={() => setCurrentView('placement-prep')}>
          <ArrowLeft size={16} />
          <span>Back to Modules</span>
        </button>

        <div className="sidebar-scrollable-content">
          {/* DSA Concepts Section */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">DSA CONCEPTS</span>
            <div className="sidebar-items-list">
              {dsaConceptsList.map((concept) => (
                <button
                  key={concept}
                  className={`sidebar-item-btn ${selectedConcept === concept ? 'active' : ''}`}
                  onClick={() => handleConceptSelect(concept)}
                >
                  {getConceptIcon(concept)}
                  <span className="item-label">{concept}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">LANGUAGES</span>
            <div className="sidebar-items-list">
              {languagesList.map((lang) => (
                <button
                  key={lang}
                  className={`sidebar-item-btn ${selectedLanguage === lang ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect(lang)}
                >
                  <Code size={15} />
                  <span className="item-label">{lang}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interview Prep Section */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">INTERVIEW PREP</span>
            <div className="sidebar-items-list">
              {interviewLevels.map((level) => (
                <button
                  key={level}
                  className={`sidebar-item-btn level-${level.toLowerCase()} ${selectedLevel === level ? 'active' : ''}`}
                  onClick={() => handleLevelSelect(level)}
                >
                  <Trophy size={15} />
                  <span className="item-label">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="sidebar-group">
            <span className="sidebar-group-title">QUICK ACTIONS</span>
            <div className="sidebar-items-list">
              {quickActionsList.map((action) => (
                <button
                  key={action}
                  className="sidebar-item-btn quick-action-item"
                  onClick={() => handleQuickAction(action)}
                >
                  <Sparkles size={15} className="sparkle-icon" />
                  <span className="item-label">{action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* MIDDLE PANEL: MAIN AI WORKSPACE */}
      <main className="workspace-center-panel">
        <header className="workspace-header">
          <div className="header-titles">
            <span className="category-tag">CODING PREP</span>
            <h1 className="header-main-title">AI Coding Assistant</h1>
            <p className="header-subtitle">Practice coding, solve DSA problems, debug code, and prepare for interviews.</p>
          </div>
          
          <div className="theme-toggle-container">
            <button 
              className={`theme-toggle-pill ${theme}`} 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              title="Toggle Theme"
            >
              <div className="theme-knob">
                {theme === 'light' ? <Sun size={13} /> : <Moon size={13} />}
              </div>
              <span className="toggle-label-sun">☀️</span>
              <span className="toggle-label-moon">🌙</span>
            </button>
          </div>
        </header>

        {/* Floating background decorations */}
        <div className="floating-decorations">
          <div className="decor-glow-purple"></div>
          <span className="decor-icon icon-1">&lt;/&gt;</span>
          <span className="decor-icon icon-2">&#123; &#125;</span>
          <span className="decor-icon icon-3">[ ]</span>
          <span className="decor-icon icon-4">if</span>
          <span className="decor-icon icon-5">while</span>
        </div>

        {/* Chat History View */}
        <div className="chat-history-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-row ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="message-avatar bot">
                  <div className="avatar-circle purple-gradient">
                    <Sparkles size={16} />
                  </div>
                </div>
              )}
              
              <div className={`message-bubble ${msg.sender}`}>
                <div className="bubble-content">
                  {msg.sender === 'bot' ? parseMessageText(msg.text) : msg.text}
                </div>
                {msg.time && <span className="bubble-time">{msg.time}</span>}
              </div>

              {msg.sender === 'user' && (
                <div className="message-avatar user">
                  <div className="avatar-circle user-circle">
                    {localStorage.getItem('chat_user_name')?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="chat-row bot">
              <div className="message-avatar bot">
                <div className="avatar-circle purple-gradient loading-spin">
                  <RefreshCw size={16} />
                </div>
              </div>
              <div className="message-bubble bot typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* BOTTOM INPUT CONTAINER */}
        <div className="chat-input-container-glass">
          <textarea
            ref={textInputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask coding questions, solve DSA problems, paste code, debug programs..."
            className="workspace-textarea"
          />
          <div className="input-toolbar">
            <div className="toolbar-left-actions">
              <button className="toolbar-btn" title="Attach file">
                <Paperclip size={18} />
              </button>
              <button className="toolbar-btn" title="Add code snippet" onClick={() => setInput(prev => prev + '\n```python\n\n```')}>
                <Code size={18} />
              </button>
            </div>
            <button className="send-btn-round" onClick={() => handleSend()} disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* RIGHT PANEL: SUMMARY & STATISTICS */}
      <aside className="workspace-right-sidebar">
        {/* Suggested Problems */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <BookOpen size={16} className="title-icon purple-text" />
              <span>Suggested Problems</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show all suggested DSA problems.")}>View all</button>
          </div>
          <div className="problems-list">
            {filteredProblems.map((prob) => (
              <div key={prob.name} className="problem-list-item" onClick={() => handleProblemClick(prob.name)}>
                <span className="problem-name">{prob.name}</span>
                <span className={`difficulty-badge ${prob.diff.toLowerCase()}`}>{prob.diff}</span>
              </div>
            ))}
            {filteredProblems.length === 0 && (
              <p className="empty-list-text">No problems match the selected difficulty.</p>
            )}
          </div>
        </div>

        {/* Recent Questions */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <History size={16} className="title-icon purple-text" />
              <span>Recent Questions</span>
            </h3>
            <button className="card-action-link" onClick={() => setInput("Show my full coding practice history.")}>View all</button>
          </div>
          <div className="recent-questions-list">
            {recentQuestionsList.map((q, idx) => (
              <div key={idx} className="recent-question-item" onClick={() => handleRecentClick(q.text)}>
                <span className="question-text">{q.text}</span>
                <span className="question-time">{q.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="right-panel-card glass-card">
          <div className="card-header-row">
            <h3 className="card-title">
              <Trophy size={16} className="title-icon purple-text" />
              <span>Progress Tracker</span>
            </h3>
            <span className="timeframe-tag">This Week</span>
          </div>
          
          <ProgressChart />

          <div className="stats-row-grid">
            <div className="stat-box-mini">
              <span className="stat-val solved-color">24</span>
              <span className="stat-desc">Problems Solved</span>
            </div>
            <div className="stat-box-mini">
              <span className="stat-val streak-color">
                <Flame size={16} className="inline-icon" /> 7
              </span>
              <span className="stat-desc">Streak</span>
            </div>
            <div className="stat-box-mini">
              <span className="stat-val accuracy-color">92%</span>
              <span className="stat-desc">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Filter by Difficulty */}
        <div className="right-panel-card glass-card">
          <h3 className="card-title select-none">Filter by Difficulty</h3>
          <div className="difficulty-pills-row">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                className={`diff-pill-btn ${selectedDifficultyFilter === diff ? 'active' : ''} ${diff.toLowerCase()}`}
                onClick={() => setSelectedDifficultyFilter(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CodingPrep;
