import { useState } from 'react';
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Abdussalam Nasir',
      role: 'Instructor',
      lastMessage: 'Great progress on your project!',
      time: '2 min ago',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Abdulhafiz Nasir',
      role: 'Instructor',
      lastMessage: 'Let me know if you have questions about security.',
      time: '1 hour ago',
      unread: 0,
      online: false,
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      role: 'Student',
      lastMessage: 'Can you help me with the React assignment?',
      time: '3 hours ago',
      unread: 1,
      online: true,
    },
    {
      id: '4',
      name: 'Mike Chen',
      role: 'Student',
      lastMessage: 'Thanks for the help!',
      time: 'Yesterday',
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: '1',
      content: 'Hi! How is your learning going?',
      timestamp: '10:00 AM',
      isRead: true,
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Going great! I just finished the JavaScript module.',
      timestamp: '10:05 AM',
      isRead: true,
    },
    {
      id: '3',
      senderId: '1',
      content: 'That\'s awesome! Great progress on your project!',
      timestamp: '10:07 AM',
      isRead: false,
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    toast.success('Message sent');
    setMessageInput('');
  };

  const selectedUser = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Conversations List */}
      <div className="w-80 bg-dark-light border border-gray-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="font-display text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 bg-dark border-gray-700 text-white placeholder:text-gray-600"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  selectedConversation === conversation.id
                    ? 'bg-neon/10 border border-neon/30'
                    : 'hover:bg-dark'
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-neon/20">
                    <AvatarFallback className="text-neon">
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 rounded-full border-2 border-dark-light" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium text-sm">{conversation.name}</p>
                    <span className="text-gray-500 text-xs">{conversation.time}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{conversation.role}</p>
                  <p className="text-gray-400 text-sm truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="h-5 w-5 bg-neon text-dark text-xs font-bold rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-dark-light border border-gray-800 rounded-xl overflow-hidden flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 bg-neon/20">
                  <AvatarFallback className="text-neon">
                    {selectedUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{selectedUser.name}</p>
                  <p className="text-gray-500 text-xs">
                    {selectedUser.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-neon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-neon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-neon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        message.senderId === 'me'
                          ? 'bg-neon text-dark'
                          : 'bg-dark text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`flex items-center justify-end space-x-1 mt-1 ${
                          message.senderId === 'me' ? 'text-dark/60' : 'text-gray-500'
                        }`}
                      >
                        <span className="text-xs">{message.timestamp}</span>
                        {message.senderId === 'me' && (
                          message.isRead ? (
                            <CheckCheck className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-neon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-dark border-gray-700 text-white placeholder:text-gray-600"
                />
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-neon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  className="bg-neon text-dark hover:bg-neon-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
