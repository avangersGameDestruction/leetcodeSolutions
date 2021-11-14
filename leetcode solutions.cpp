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