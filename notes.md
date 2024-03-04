### Calculation

- Simulation :

1 Item +12 Result: 12
2 Item +7 Result: (+12+7)= +19
3 Item -5 Result (+19-5)= +14
4 Item x3 Result (+14 x 3)=+42
5 Item /2 Result (+42/2)=+21
6 Item %10 Result (+21x10/100)= +2.1

In every new item calculation is done, and pass . So we can add new entry in inputs array like. Name it items/actual result.

- After modification whatever input, and every input entry
- start this function which refresh state of results.

- Deleting remote branch.
  git push origin --delete serverfix

- Squashing few commits in to one
  git rebase -i HEAD!<<number_of_commits_with one to pick>>
  set squash to commits which you want to squeez .One oldest should be pick.
  enter new commit message
  git push --force-with-lease to ensure noone made same changes on remote.
