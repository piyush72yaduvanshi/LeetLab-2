import React, { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";
import {
  Play,
  Settings,
  Download,
  Upload,
  Copy,
  RotateCcw,
  Maximize2,
  Minimize2,
  Palette,
  Type,
  Code2,
  CheckCircle2,
  Zap
} from 'lucide-react';

const EnhancedCodeEditor = ({ 
  code, 
  onChange, 
  language = 'javascript', 
  onLanguageChange,
  onRun,
  onSubmit,
  isExecuting = false,
  isSubmitting = false
}) => {
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'go', name: 'Go', icon: '🐹' }
  ];

  const themes = [
    { id: 'vs-dark', name: 'Dark', preview: 'bg-gray-900' },
    { id: 'light', name: 'Light', preview: 'bg-white' },
    { id: 'hc-black', name: 'High Contrast', preview: 'bg-black' }
  ];

  const codeTemplates = {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function solution(nums, target) {
    // Write your code here
    
}

// Test your solution
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const input = JSON.parse(line);
    const result = solution(input.nums, input.target);
    console.log(JSON.stringify(result));
    rl.close();
});`,
    python: `class Solution:
    def solution(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass

# Test your solution
if __name__ == "__main__":
    import sys
    import json
    
    line = sys.stdin.readline().strip()
    data = json.loads(line)
    
    sol = Solution()
    result = sol.solution(data['nums'], data['target'])
    
    print(json.dumps(result))`,
    java: `import java.util.*;
import java.io.*;

public class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        // Parse JSON input
        // Implement your input parsing logic here
        
        Solution sol = new Solution();
        int[] result = sol.solution(nums, target);
        
        System.out.println(Arrays.toString(result));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
#include <sstream>

using namespace std;

class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};

int main() {
    string line;
    getline(cin, line);
    
    // Parse input (implement JSON parsing or simple format)
    // For now, assuming simple space-separated input
    
    Solution sol;
    vector<int> nums; // Parse from input
    int target; // Parse from input
    
    vector<int> result = sol.solution(nums, target);
    
    // Output result
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}`,
    typescript: `function solution(nums: number[], target: number): number[] {
    // Write your code here
    return [];
}

// Test your solution
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line: string) => {
    const input = JSON.parse(line);
    const result = solution(input.nums, input.target);
    console.log(JSON.stringify(result));
    rl.close();
});`,
    go: `package main

import (
    "bufio"
    "encoding/json"
    "fmt"
    "os"
)

func solution(nums []int, target int) []int {
    // Write your code here
    return []int{}
}

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := scanner.Text()
    
    var input struct {
        Nums   []int \`json:"nums"\`
        Target int   \`json:"target"\`
    }
    
    json.Unmarshal([]byte(line), &input)
    
    result := solution(input.Nums, input.Target)
    
    output, _ := json.Marshal(result)
    fmt.Println(string(output))
}`
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Add custom key bindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun && onRun();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      onSubmit && onSubmit();
    });
  };

  const handleLanguageChange = (newLanguage) => {
    onLanguageChange(newLanguage);
    // Auto-load template if code is empty or default
    if (!code || code === codeTemplates[language]) {
      onChange(codeTemplates[newLanguage] || '// Start coding here...');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const handleResetCode = () => {
    onChange(codeTemplates[language] || '// Start coding here...');
  };

  const handleDownloadCode = () => {
    const extensions = {
      javascript: 'js',
      python: 'py', 
      java: 'java',
      cpp: 'cpp',
      typescript: 'ts',
      go: 'go'
    };
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${extensions[language] || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const editorOptions = {
    minimap: { enabled: !isFullscreen },
    fontSize: fontSize,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: language === 'python' ? 4 : 2,
    insertSpaces: true,
    wordWrap: 'on',
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    snippetSuggestions: 'inline',
    folding: true,
    foldingHighlight: true,
    showFoldingControls: 'always',
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };

  return (
    <div className={`card bg-base-100 shadow-xl ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="card-body p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-semibold">Code Editor</span>
            </div>
            
            {/* Language Selector */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm btn-outline gap-2">
                <span>{languages.find(l => l.id === language)?.icon}</span>
                {languages.find(l => l.id === language)?.name}
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {languages.map((lang) => (
                  <li key={lang.id}>
                    <a onClick={() => handleLanguageChange(lang.id)} className={language === lang.id ? 'active' : ''}>
                      <span>{lang.icon}</span>
                      {lang.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Settings */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-ghost btn-square">
                <Settings className="w-4 h-4" />
              </label>
              <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-4 shadow bg-base-100">
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Theme</span>
                    </label>
                    <div className="flex gap-2">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`btn btn-xs ${theme === t.id ? 'btn-primary' : 'btn-outline'}`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Font Size: {fontSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="range range-primary range-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <button onClick={handleCopyCode} className="btn btn-sm btn-ghost btn-square" title="Copy Code">
              <Copy className="w-4 h-4" />
            </button>
            
            <button onClick={handleResetCode} className="btn btn-sm btn-ghost btn-square" title="Reset Code">
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button onClick={handleDownloadCode} className="btn btn-sm btn-ghost btn-square" title="Download Code">
              <Download className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              className="btn btn-sm btn-ghost btn-square"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className={`${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[500px]'} w-full`}>
          <Editor
            height="100%"
            language={language === 'cpp' ? 'cpp' : language}
            theme={theme}
            value={code}
            onChange={onChange}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-base-300 bg-base-200">
          <div className="flex items-center gap-4 text-sm text-base-content/60">
            <span>Ctrl+Enter to run</span>
            <span>Ctrl+Shift+Enter to submit</span>
            <span>Line: {editorRef.current?.getPosition()?.lineNumber || 1}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={onRun}
              disabled={isExecuting || isSubmitting}
              className={`btn btn-primary btn-sm gap-2 ${isExecuting ? 'loading' : ''}`}
            >
              {!isExecuting && <Play className="w-4 h-4" />}
              Run Code
            </button>
            
            <button 
              onClick={onSubmit}
              disabled={isExecuting || isSubmitting}
              className={`btn btn-success btn-sm gap-2 ${isSubmitting ? 'loading' : ''}`}
            >
              {!isSubmitting && <CheckCircle2 className="w-4 h-4" />}
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCodeEditor;