import { useState } from 'react';
import {
  Play,
  Save,
  Folder,
  FileCode,
  Settings,
  Trash2,
  Plus,
  Terminal,
  Monitor,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const CodingSandbox = () => {
  const [code, setCode] = useState(`// Welcome to CodeBreakers Sandbox!
// Write your code here and click Run to see the output

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("CodeBreaker"));

// Try modifying the code above!`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<'javascript' | 'html' | 'python'>('javascript');
  const [activeFile, setActiveFile] = useState('script.js');
  const [, setShowPreview] = useState(false);
  const [files] = useState([
    { name: 'index.html', type: 'html', content: '<h1>Hello World</h1>' },
    { name: 'style.css', type: 'css', content: 'body { color: #333; }' },
    { name: 'script.js', type: 'javascript', content: 'console.log("Hello");' },
  ]);

  const handleRun = () => {
    setOutput('');
    
    if (language === 'html') {
      setShowPreview(true);
      setOutput('HTML rendered in preview panel');
    } else if (language === 'javascript') {
      // Simulate JavaScript execution
      const mockOutput = `> ${code.split('\n').join('\n> ')}

Output:
Hello, CodeBreaker!

Execution completed in 0.023s`;
      setOutput(mockOutput);
    } else if (language === 'python') {
      const mockOutput = `> ${code.split('\n').join('\n> ')}

Output:
Hello, CodeBreaker!

Execution completed in 0.045s`;
      setOutput(mockOutput);
    }
    
    toast.success('Code executed successfully');
  };

  const handleSave = () => {
    toast.success('File saved successfully');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Coding Sandbox</h1>
          <p className="text-gray-400">Practice and experiment with code</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-dark-light border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML/CSS</option>
            <option value="python">Python</option>
          </select>
          <Button
            variant="outline"
            onClick={handleSave}
            className="border-gray-700 text-gray-300 hover:text-neon"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleRun} className="bg-neon text-dark hover:bg-neon-dark">
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* File Explorer */}
        <div className="w-64 bg-dark-light border border-gray-800 rounded-xl overflow-hidden flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <span className="text-white font-medium flex items-center">
              <Folder className="h-4 w-4 mr-2 text-neon" />
              Files
            </span>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {files.map((file, index) => (
              <button
                key={index}
                onClick={() => setActiveFile(file.name)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeFile === file.name
                    ? 'bg-neon/10 text-neon'
                    : 'text-gray-400 hover:bg-dark'
                }`}
              >
                <FileCode className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Code Editor */}
          <div className="flex-1 bg-dark-light border border-gray-800 rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
              <span className="text-gray-400 text-sm flex items-center">
                <FileCode className="h-4 w-4 mr-2" />
                {activeFile}
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
            <div className="flex-1 flex">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-dark p-4 text-gray-300 font-mono text-sm resize-none outline-none"
                spellCheck={false}
              />
              {/* Line Numbers */}
              <div className="w-12 bg-dark-light border-l border-gray-800 py-4 text-right pr-3 text-gray-600 font-mono text-sm select-none">
                {code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Output / Preview */}
          <div className="h-48 bg-dark-light border border-gray-800 rounded-xl overflow-hidden flex flex-col">
            <Tabs defaultValue="output" className="flex-1 flex flex-col">
              <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                <TabsList className="bg-dark">
                  <TabsTrigger
                    value="output"
                    className="data-[state=active]:bg-neon data-[state=active]:text-dark"
                  >
                    <Terminal className="h-4 w-4 mr-2" />
                    Output
                  </TabsTrigger>
                  {language === 'html' && (
                    <TabsTrigger
                      value="preview"
                      className="data-[state=active]:bg-neon data-[state=active]:text-dark"
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  )}
                </TabsList>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setOutput('')}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <TabsContent value="output" className="m-0 h-full">
                  <pre className="p-4 text-gray-300 font-mono text-sm">
                    {output || '> Click Run to see output...'}
                  </pre>
                </TabsContent>
                {language === 'html' && (
                  <TabsContent value="preview" className="m-0 h-full">
                    <iframe
                      srcDoc={code}
                      className="w-full h-full bg-white"
                      title="preview"
                    />
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingSandbox;
