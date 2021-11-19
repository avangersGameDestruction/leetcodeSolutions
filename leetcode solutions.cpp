/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if (lists.empty()) {
            return nullptr;
        }
        int n = lists.size();
        while (n > 1) {
            for (int i = 0; i < n / 2; i++) {
                lists[i] = mergeTwoLists(lists[i], lists[n - 1 - i]);
            }
            n = (n + 1) / 2;
        }
        return lists[0];
    }

    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* head = new ListNode(0);
        ListNode* cur = head;
        while (l1 && l2) {
            if (l1->val < l2->val) {
                cur->next = l1;
                l1 = l1->next;
            } else {
                cur->next = l2;
                l2 = l2->next;
            }
            cur = cur->next;
        }
        cur->next = l1 ? l1 : l2;
        return head->next;
    }
};
 
// longest Valid Parentheses 
class Solution {
public:
    int longestValidParentheses(string s) {
     stack<int> st;
        int counter = 0;
        int sum = 0;
        for(int i = 0; s[i]; i++){
            if(s[i] == '(')
                st.push(i);
           else if(s[i] == ')'){
                if(st.empty() || s[st.top()] == ')'){
                    st.push(i);
                    cout << s[i] << " ";
                }
                else {
                st.pop();  
                }
            }
        }
        while(!st.empty()){
            s[st.top()] = '#';
            st.pop();
        }
        for(int i = 0; s[i]; i++){
            if(s[i] == '#'){
                sum = max(sum,counter);
                counter = 0;
            }
            else{
                counter++;
                sum = max(sum,counter);
            }
        }
        return sum;
    }
};

// https://leetcode.com/problems/regular-expression-matching/submissions/

// smallest solution
class Solution {
public:
    bool isMatch(string s, string p) {
        return regex_match(s, regex(p));
    }
};

// normal solution 
class Solution {
public:
    bool isMatch(string s, string p) {
        if(p.empty())
            return s.empty();
        bool fchar = (!s.empty() && ((p[0]==s[0]) || (p[0]=='.')));
        if(p.length()>=2 && p[1]=='*')
            return (isMatch(s, p.substr(2))||(fchar && isMatch(s.substr(1), p)));
            else
            return fchar && isMatch(s.substr(1), p.substr(1));
    }
};

// big solution
class Solution {
    bool dp(int i, int j, string s, string p, vector<vector<int>> &memo)
    {
        if(memo[i][j]!=-1)
            return memo[i][j] == 1;
        bool ans;
        if(j==p.length())
            ans = i == s.length();
        else
        {
            bool fchar =  (i<s.length() && (p[j]==s[i] || p[j]=='.'));
            if(j+1<p.length() && p[j+1]=='*')
                ans = (dp(i, j+2, s, p, memo)||(fchar && dp(i+1, j, s, p, memo)));
            else
                ans = fchar && dp(i+1, j+1, s, p, memo);
        }
        memo[i][j] = ans?1:0;
        return ans;
    }
public:
    bool isMatch(string s, string p) {
        vector<vector<int>> memo(s.length()+1, vector<int>(p.length()+1, -1));
        return dp(0, 0, s, p, memo);
    }
};

// hammingDistance
class Solution {
public:
    int hammingDistance(int x, int y) {
        int res = 0;
        int n = x ^ y;
        while (n) {
            res += n & 1;
            n >>= 1;
        }
        return res;
    }
};

// substring with concatenation of all words
class Solution {
public:
    void find_sub_str(string s, vector<string>& words, int start, vector<int>& ans,unordered_map<string,int> count){
        int word_size = words[0].size();
        int times = words.size();
        int end_pos = start + times*word_size - 1;
        if(end_pos > s.size() )
            return;
        
        unordered_map<string,int> record;
        for(int i=start;i<=end_pos;){
            while(times){
                string sub_str = s.substr(i,word_size);
				
				auto it = find(words.begin(),words.end(),sub_str);
                if(it != words.end()){
                    record[sub_str]++;
                }else{
                    return;
                }
                i+=word_size;
                times--;
            }
        }
		
		if(record == count)
            ans.push_back(start);
    }
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> ans;

        int word_size = words[0].size();
        int times = words.size();
		
		unordered_map<string,int> count;
        for(auto w:words)
            count[w] += 1;
        
        for(int i=0;i<s.size();i++){    
            string sub_str = s.substr(i,word_size);
  
            auto it = find(words.begin(),words.end(),sub_str);
            if(it != words.end()) {
                find_sub_str(s, words, i,ans,count);
            }
        }     
        return ans;
    }
};