// ═══════════════════════════════════════════════
//  BUGS FIXED IN THIS VERSION:
//  1. renderBars: leftptr/rightptr now above comparing (Two Pointers colors visible)
//  2. resetButtonStates: stepBackBtn re-enabled when stepIdx > 0
//  3. countingGen: uses fill(1) instead of fill(min) for placeholder bars
//  5. stepBtn: updateStepInfo() called unconditionally at end
//  6. applyTheme: uses .theme-toggle-label class instead of span:last-child
// ═══════════════════════════════════════════════

const META = {
  bubble:{title:'Bubble Sort',tags:['Comparison','In-Place','Stable'],desc:'Repeatedly compares adjacent elements and swaps them if out of order. Each pass moves the largest unsorted element to its final position.',best:'O(n)',avg:'O(n²)',worst:'O(n²)',space:'O(1)',legend:[{color:'var(--c-default)',label:'Unsorted'},{color:'var(--c-comparing)',label:'Comparing'},{color:'var(--c-swapping)',label:'Swapping'},{color:'var(--c-sorted)',label:'Sorted'}]},
  selection:{title:'Selection Sort',tags:['Comparison','In-Place','Unstable'],desc:'Finds the minimum element in the unsorted region and swaps it to its correct position. Builds a sorted prefix one element at a time.',best:'O(n²)',avg:'O(n²)',worst:'O(n²)',space:'O(1)',legend:[{color:'var(--c-default)',label:'Unsorted'},{color:'var(--c-comparing)',label:'Current Min'},{color:'var(--c-swapping)',label:'Comparing'},{color:'var(--c-sorted)',label:'Sorted'}]},
  insertion:{title:'Insertion Sort',tags:['Comparison','In-Place','Stable'],desc:'Builds a sorted array one item at a time by inserting each new element into its correct position within the already-sorted prefix.',best:'O(n)',avg:'O(n²)',worst:'O(n²)',space:'O(1)',legend:[{color:'var(--c-default)',label:'Unsorted'},{color:'var(--c-pivot)',label:'Key Element'},{color:'var(--c-comparing)',label:'Comparing'},{color:'var(--c-sorted)',label:'Sorted'}]},
  merge:{title:'Merge Sort',tags:['Divide & Conquer','Stable','O(n) Space'],desc:'Recursively divides the array in half, sorts each half, then merges the sorted halves. Guarantees O(n log n) in all cases.',best:'O(n log n)',avg:'O(n log n)',worst:'O(n log n)',space:'O(n)',legend:[{color:'var(--c-default)',label:'Unsorted'},{color:'var(--c-left)',label:'Left Half'},{color:'var(--c-right)',label:'Right Half'},{color:'var(--c-comparing)',label:'Merging'},{color:'var(--c-sorted)',label:'Sorted'}]},
  quick:{title:'Quick Sort',tags:['Divide & Conquer','In-Place','Unstable'],desc:'Selects a pivot element and partitions the array around it. Elements smaller than the pivot go left; larger go right. Recursively applied.',best:'O(n log n)',avg:'O(n log n)',worst:'O(n²)',space:'O(log n)',legend:[{color:'var(--c-default)',label:'Unsorted'},{color:'var(--c-pivot)',label:'Pivot'},{color:'var(--c-comparing)',label:'Comparing'},{color:'var(--c-swapping)',label:'Swapping'},{color:'var(--c-sorted)',label:'Sorted'}]},
  counting:{title:'Counting Sort',tags:['Non-Comparison','Stable','O(n+k) Space'],desc:'Counts the occurrences of each distinct element, then uses arithmetic to determine positions. Efficient for small range of integers.',best:'O(n+k)',avg:'O(n+k)',worst:'O(n+k)',space:'O(n+k)',legend:[{color:'var(--c-default)',label:'Original'},{color:'var(--c-bucket)',label:'Counting'},{color:'var(--c-comparing)',label:'Placing'},{color:'var(--c-sorted)',label:'Sorted'}]},
  twopointers:{title:'Two Pointers',tags:['Technique','O(n) Time','In-Place'],desc:'Uses two pointers moving from opposite ends to find a pair that sums to a target. Demonstrates the fundamental two-pointer pattern.',best:'O(n)',avg:'O(n)',worst:'O(n)',space:'O(1)',legend:[{color:'var(--c-left)',label:'Left Pointer'},{color:'var(--c-right)',label:'Right Pointer'},{color:'var(--c-comparing)',label:'Checking Sum'},{color:'var(--c-found)',label:'Found Pair'},{color:'var(--c-elim)',label:'Eliminated'}]},
  slidingwindow:{title:'Sliding Window',tags:['Technique','O(n) Time','Fixed Window'],desc:'Maintains a window of fixed size that slides through the array. Finds the maximum sum subarray of size k using efficient window updates.',best:'O(n)',avg:'O(n)',worst:'O(n)',space:'O(1)',legend:[{color:'var(--c-bucket)',label:'In Window'},{color:'var(--c-comparing)',label:'Adding to Window'},{color:'var(--c-found)',label:'Best Window'},{color:'var(--c-elim)',label:'Outside Window'}]},
  linear:{title:'Linear Search',tags:['Search','Sequential','Unsorted OK'],desc:'Checks each element in sequence from start to end until the target is found or the array ends. Works on unsorted arrays.',best:'O(1)',avg:'O(n)',worst:'O(n)',space:'O(1)',legend:[{color:'var(--c-default)',label:'Not Checked'},{color:'var(--c-current)',label:'Checking'},{color:'var(--c-found)',label:'Found'},{color:'var(--c-elim)',label:'Not Match'}]},
  binary:{title:'Binary Search',tags:['Search','Iterative','Sorted Required'],desc:'Locates a target in a sorted array by repeatedly halving the search range. Compares the target with the midpoint and discards the irrelevant half.',best:'O(1)',avg:'O(log n)',worst:'O(log n)',space:'O(1)',legend:[{color:'var(--c-left)',label:'Left pointer'},{color:'var(--c-right)',label:'Right pointer'},{color:'var(--c-mid)',label:'Mid (checking)'},{color:'var(--c-found)',label:'Found'},{color:'var(--c-elim)',label:'Eliminated'}]},
};

const SORT_ALGOS      = new Set(['bubble','selection','insertion','merge','quick','counting']);
const TECHNIQUE_ALGOS = new Set(['twopointers','slidingwindow']);
const SEARCH_ALGOS    = new Set(['linear','binary']);
const GRID_ALGOS      = new Set(['linear','binary']);
const SPEEDS = {1:800,2:380,3:160,4:50,5:8};
const SPEED_LABELS = {1:'Very Slow',2:'Slow',3:'Medium',4:'Fast',5:'Instant'};

let algo='bubble', arr=[], steps=[], stepIdx=0, running=false, paused=false;

const $=id=>document.getElementById(id);
const statusDot=  $('statusDot'),   statusText= $('statusText'),  stepInfo=    $('stepInfo');
const sizeSlider= $('sizeSlider'),  sizeVal=    $('sizeVal'),     speedSlider= $('speedSlider');
const speedVal=   $('speedVal'),    runBtn=     $('runBtn'),       stepBtn=     $('stepBtn');
const stepBackBtn=$('stepBackBtn'), pauseBtn=   $('pauseBtn'),     resetBtn=    $('resetBtn');
const shuffleBtn= $('shuffleBtn'),  windowSlider=$('windowSlider'),windowSizeVal=$('windowSizeVal');

const rand    = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const randArr = n=>Array.from({length:n},()=>rand(10,99));
const sleep   = ms=>new Promise(r=>setTimeout(r,ms));

function updateSidebar(a) {
  const m=META[a];
  $('algoTitle').textContent=m.title;
  $('algoTags').innerHTML=m.tags.map(t=>`<span class="tag">${t}</span>`).join('');
  $('algoDesc').textContent=m.desc;
  $('cxGrid').innerHTML=`
    <div class="cx-cell"><div class="cx-label">Best</div><div class="cx-val">${m.best}</div></div>
    <div class="cx-cell"><div class="cx-label">Average</div><div class="cx-val">${m.avg}</div></div>
    <div class="cx-cell"><div class="cx-label">Worst</div><div class="cx-val">${m.worst}</div></div>
    <div class="cx-cell"><div class="cx-label">Space</div><div class="cx-val">${m.space}</div></div>`;
  $('legendList').innerHTML=m.legend.map(l=>`
    <div class="legend-row"><div class="legend-swatch" style="background:${l.color}"></div>${l.label}</div>`).join('');

  const isSearch=SEARCH_ALGOS.has(a), isTechnique=TECHNIQUE_ALGOS.has(a);
  $('targetCtrl').style.display    = isSearch          ? 'block':'none';
  $('targetSumCtrl').style.display = a==='twopointers' ? 'block':'none';
  $('windowCtrl').style.display    = a==='slidingwindow'?'block':'none';
  $('sizeCtrl').style.display      = (isSearch||isTechnique)?'none':'block';
  $('presetCtrl').style.display    = SORT_ALGOS.has(a) ? 'block':'none';
  if(SORT_ALGOS.has(a)){
    $('presetBest').innerHTML  =`Best <span class="preset-case">(${m.best})</span>`;
    $('presetAvg').innerHTML   =`Avg <span class="preset-case">(${m.avg})</span>`;
    $('presetWorst').innerHTML =`Worst <span class="preset-case">(${m.worst})</span>`;
    $('presetEqual').innerHTML =`Equal <span class="preset-case">(edge)</span>`;
  }
}

function setStatus(msg, state='idle') {
  statusText.textContent=msg;
  statusDot.className='status-dot'+(state==='running'?' running':state==='done'?' done':state==='error'?' error':'');
}

function updateStepInfo() {
  stepInfo.textContent=steps.length?`${stepIdx} / ${steps.length}`:'— / —';
}

// FIX 2: Re-enable stepBackBtn when there are steps to go back
function resetButtonStates() {
  running=false; paused=false;
  runBtn.disabled     =false;
  stepBtn.disabled    =false;
  stepBackBtn.disabled=(stepIdx<=0);  // FIXED: was always true
  pauseBtn.disabled   =true;
  pauseBtn.textContent='Pause';
}

// FIX 1: Move leftptr/rightptr above comparing in priority
function renderBars(a, hl={}) {
  const maxV=Math.max(...a,1);
  const canvasEl=$('vizCanvas');
  const H=(canvasEl.offsetHeight||320)-56;
  const W=(canvasEl.offsetWidth ||700)-32;
  const n=a.length;
  const gap=n>45?1:n>30?2:3;
  const bw=Math.max(6,Math.floor((W-gap*(n-1))/n));

  canvasEl.innerHTML='';
  canvasEl.style.alignItems='flex-end';
  canvasEl.style.gap=gap+'px';

  a.forEach((v,i)=>{
    const bar=document.createElement('div');
    bar.className='bar';
    bar.style.width=bw+'px';
    bar.style.height=Math.max(4,Math.round((v/maxV)*H))+'px';

    // FIXED: leftptr/rightptr moved above comparing
    if      (hl.sorted    &&hl.sorted.includes(i))          bar.classList.add('st-sorted');
    else if (hl.found     &&hl.found.includes(i))           bar.classList.add('st-found');
    else if (hl.pivot     !==undefined&&hl.pivot===i)        bar.classList.add('st-pivot');
    else if (hl.heap      &&hl.heap.includes(i))            bar.classList.add('st-heap');
    else if (hl.bestWindow&&hl.bestWindow.includes(i))      bar.classList.add('st-best-window');
    else if (hl.window    &&hl.window.includes(i))          bar.classList.add('st-window');
    else if (hl.swapping  &&hl.swapping.includes(i))        bar.classList.add('st-swapping');
    else if (hl.leftptr   !==undefined&&hl.leftptr===i)     bar.classList.add('st-leftptr');
    else if (hl.rightptr  !==undefined&&hl.rightptr===i)    bar.classList.add('st-rightptr');
    else if (hl.comparing &&hl.comparing.includes(i))       bar.classList.add('st-comparing');
    else if (hl.current   !==undefined&&hl.current===i)     bar.classList.add('st-current');
    else if (hl.leftpart  &&hl.leftpart.includes(i))        bar.classList.add('st-leftpart');
    else if (hl.rightpart &&hl.rightpart.includes(i))       bar.classList.add('st-rightpart');
    else if (hl.bucket    &&hl.bucket.includes(i))          bar.classList.add('st-bucket');
    else if (hl.eliminated&&hl.eliminated.includes(i))      bar.classList.add('st-elim');
    else                                                    bar.classList.add('st-default');

    if(bw>=20&&n<=28){
      const lbl=document.createElement('div');
      lbl.className='bar-val'; lbl.textContent=v;
      bar.appendChild(lbl);
    }
    canvasEl.appendChild(bar);
  });
}

function renderGrid(a, state={}) {
  const canvasEl=$('vizCanvas');
  canvasEl.innerHTML='';
  canvasEl.style.alignItems='center';
  canvasEl.style.gap='0';
  const grid=document.createElement('div');
  grid.className='bin-grid';

  a.forEach((v,i)=>{
    const cell=document.createElement('div');
    cell.className='bin-cell';
    cell.textContent=v;
    const idx=document.createElement('div');
    idx.className='cell-idx'; idx.textContent=i;
    cell.appendChild(idx);

    const elim=state.eliminated&&state.eliminated.includes(i);
    if      (state.found===i)   cell.classList.add('bc-found');
    else if (elim)              cell.classList.add('bc-elim');
    else if (state.current===i) cell.classList.add('bc-current');
    else if (state.mid===i)     cell.classList.add('bc-mid');
    else if (i===state.left)    cell.classList.add('bc-left');
    else if (i===state.right)   cell.classList.add('bc-right');

    const ptrs=[];
    if(i===state.left &&!elim&&state.mid!==i&&state.found!==i) ptrs.push({text:'L',  color:'var(--c-left)'});
    if(i===state.right&&!elim&&state.mid!==i&&state.found!==i) ptrs.push({text:'R',  color:'var(--c-right)'});
    if(i===state.mid  &&!elim&&state.found!==i)                ptrs.push({text:'MID',color:'var(--c-mid)'});
    if(i===state.current&&!elim&&state.found!==i)              ptrs.push({text:'→',  color:'var(--c-current)'});
    if(state.found===i)                                        ptrs.push({text:'FOUND',color:'var(--c-found)'});
    if(ptrs.length){
      const p=document.createElement('div');
      p.className='bin-pointer'; p.style.color=ptrs[0].color;
      p.textContent=ptrs.map(x=>x.text).join('/');
      cell.appendChild(p);
    }
    grid.appendChild(cell);
  });
  canvasEl.appendChild(grid);
}

function* bubbleGen(a) {
  a=[...a]; const n=a.length; const s=[];
  for(let i=0;i<n-1;i++){
    let sw=false;
    for(let j=0;j<n-i-1;j++){
      yield {arr:[...a],hl:{comparing:[j,j+1],sorted:[...s]},msg:`Compare ${a[j]} ↔ ${a[j+1]}`};
      if(a[j]>a[j+1]){
        yield {arr:[...a],hl:{swapping:[j,j+1],sorted:[...s]},msg:`Swap ${a[j]} and ${a[j+1]}`};
        [a[j],a[j+1]]=[a[j+1],a[j]]; sw=true;
      }
    }
    s.unshift(n-1-i);
    yield {arr:[...a],hl:{sorted:[...s]},msg:`Pass ${i+1} done — ${a[n-1-i]} in final position`};
    if(!sw) break;
  }
  yield {arr:[...a],hl:{sorted:[...Array(a.length).keys()]},msg:'Sorted ✓'};
}

function* selectionGen(a) {
  a=[...a]; const n=a.length; const s=[];
  for(let i=0;i<n-1;i++){
    let mi=i;
    yield {arr:[...a],hl:{current:mi,sorted:[...s]},msg:`Looking for minimum in indices ${i}..${n-1}`};
    for(let j=i+1;j<n;j++){
      yield {arr:[...a],hl:{comparing:[j],current:mi,sorted:[...s]},msg:`Compare ${a[j]} with current min ${a[mi]}`};
      if(a[j]<a[mi]){mi=j; yield {arr:[...a],hl:{current:mi,sorted:[...s]},msg:`New min: ${a[mi]} at index ${mi}`};}
    }
    if(mi!==i){
      yield {arr:[...a],hl:{swapping:[i,mi],sorted:[...s]},msg:`Swap ${a[i]} ↔ ${a[mi]}`};
      [a[i],a[mi]]=[a[mi],a[i]];
    }
    s.push(i);
    yield {arr:[...a],hl:{sorted:[...s]},msg:`${a[i]} placed at index ${i}`};
  }
  s.push(n-1);
  yield {arr:[...a],hl:{sorted:[...s]},msg:'Sorted ✓'};
}

function* insertionGen(a) {
  a=[...a]; const n=a.length; const s=[0];
  yield {arr:[...a],hl:{sorted:[...s]},msg:'First element is already sorted'};
  for(let i=1;i<n;i++){
    const key=a[i];
    yield {arr:[...a],hl:{pivot:i,sorted:[...s]},msg:`Insert ${key} into sorted prefix`};
    let j=i-1;
    while(j>=0&&a[j]>key){
      yield {arr:[...a],hl:{comparing:[j,j+1],sorted:s.filter(x=>x<j)},msg:`${a[j]} > ${key}, shift right`};
      a[j+1]=a[j]; j--;
      yield {arr:[...a],hl:{pivot:j+1,sorted:s.filter(x=>x<=j)},msg:`Shifted — key position: ${j+1}`};
    }
    a[j+1]=key; s.push(i); s.sort((x,y)=>x-y);
    yield {arr:[...a],hl:{sorted:[...s]},msg:`${key} inserted at index ${j+1}`};
  }
  yield {arr:[...a],hl:{sorted:[...Array(a.length).keys()]},msg:'Sorted ✓'};
}

function* mergeGen(a) {
  a=[...a]; const out=[];
  function ms(arr,l,r){
    if(l>=r) return;
    const m=Math.floor((l+r)/2);
    ms(arr,l,m); ms(arr,m+1,r);
    const L=arr.slice(l,m+1),R=arr.slice(m+1,r+1);
    const li=[...Array(L.length).keys()].map(i=>l+i);
    const ri=[...Array(R.length).keys()].map(i=>m+1+i);
    out.push({arr:[...arr],hl:{leftpart:li,rightpart:ri},msg:`Merge [${L}] + [${R}]`});
    let i=0,j=0,k=l;
    while(i<L.length&&j<R.length){
      out.push({arr:[...arr],hl:{comparing:[l+i,m+1+j],leftpart:li,rightpart:ri},msg:`Compare ${L[i]} ↔ ${R[j]}`});
      if(L[i]<=R[j]) arr[k++]=L[i++]; else arr[k++]=R[j++];
    }
    while(i<L.length) arr[k++]=L[i++];
    while(j<R.length) arr[k++]=R[j++];
    const merged=[...Array(r-l+1).keys()].map(i=>l+i);
    out.push({arr:[...arr],hl:{sorted:merged},msg:`Merged → [${arr.slice(l,r+1)}]`});
  }
  ms(a,0,a.length-1);
  yield* out;
  yield {arr:[...a],hl:{sorted:[...Array(a.length).keys()]},msg:'Sorted ✓'};
}

function* quickGen(a) {
  a=[...a]; const out=[],gs=new Set();
  function qs(arr,lo,hi){
    if(lo>=hi){if(lo>=0&&lo<arr.length) gs.add(lo); return;}
    const pv=arr[hi];
    out.push({arr:[...arr],hl:{pivot:hi,sorted:[...gs]},msg:`Pivot: ${pv} at index ${hi}`});
    let i=lo-1;
    for(let j=lo;j<hi;j++){
      out.push({arr:[...arr],hl:{comparing:[j,hi],pivot:hi,sorted:[...gs]},msg:`Compare ${arr[j]} with pivot ${pv}`});
      if(arr[j]<=pv){
        i++;
        if(i!==j){
          out.push({arr:[...arr],hl:{swapping:[i,j],pivot:hi,sorted:[...gs]},msg:`Swap ${arr[i]} ↔ ${arr[j]}`});
          [arr[i],arr[j]]=[arr[j],arr[i]];
        }
      }
    }
    [arr[i+1],arr[hi]]=[arr[hi],arr[i+1]]; gs.add(i+1);
    out.push({arr:[...arr],hl:{sorted:[...gs],pivot:i+1},msg:`Pivot ${arr[i+1]} in final position (index ${i+1})`});
    qs(arr,lo,i); qs(arr,i+2,hi);
  }
  qs(a,0,a.length-1);
  yield* out;
  yield {arr:[...a],hl:{sorted:[...Array(a.length).keys()]},msg:'Sorted ✓'};
}

// FIX 3: Use fill(1) not fill(min) for placeholder bars
function* countingGen(a) {
  a=[...a]; const n=a.length;
  const min=Math.min(...a),max=Math.max(...a),range=max-min+1;
  yield {arr:[...a],hl:{},msg:`Range: ${min} to ${max} (${range} values)`};
  const count=Array(range).fill(0);
  for(let i=0;i<n;i++){
    count[a[i]-min]++;
    yield {arr:[...a],hl:{bucket:[i]},msg:`Count ${a[i]}: now ${count[a[i]-min]} occurrences`};
  }
  yield {arr:[...a],hl:{},msg:'Building output array...'};
  const output=[];
  for(let i=0;i<range;i++){
    const val=i+min;
    for(let j=0;j<count[i];j++){
      output.push(val);
      // FIXED: Pad with 1 (minimum bar height) not 'min'
      const display=[...output,...Array(n-output.length).fill(1)];
      yield {arr:display,hl:{comparing:[output.length-1]},msg:`Place ${val} at position ${output.length-1}`};
    }
  }
  yield {arr:[...output],hl:{sorted:[...Array(n).keys()]},msg:'Sorted ✓'};
}

function* twoPointersGen(a, target) {
  a=[...a].sort((x,y)=>x-y);
  const n=a.length;
  let L=0,R=n-1;
  const elim=[];
  yield {arr:[...a],hl:{leftptr:L,rightptr:R},msg:`Array sorted. Find pair summing to ${target} | L=0 (${a[0]}), R=${n-1} (${a[n-1]})`};
  while(L<R){
    const sum=a[L]+a[R];
    yield {arr:[...a],hl:{leftptr:L,rightptr:R,comparing:[L,R]},msg:`Check: ${a[L]} + ${a[R]} = ${sum}`};
    if(sum===target){
      yield {arr:[...a],hl:{found:[L,R],eliminated:[...elim]},msg:`Found pair! ${a[L]} + ${a[R]} = ${target} ✓`};
      return;
    } else if(sum<target){
      elim.push(L);
      yield {arr:[...a],hl:{leftptr:L,rightptr:R,eliminated:[...elim]},msg:`${sum} < ${target} → need larger sum, move L right`};
      L++;
    } else {
      elim.push(R);
      yield {arr:[...a],hl:{leftptr:L,rightptr:R,eliminated:[...elim]},msg:`${sum} > ${target} → need smaller sum, move R left`};
      R--;
    }
    if(L<R) yield {arr:[...a],hl:{leftptr:L,rightptr:R,eliminated:[...elim]},msg:`New pointers: L=${L} (${a[L]}), R=${R} (${a[R]})`};
  }
  yield {arr:[...a],hl:{eliminated:[...elim]},msg:`No pair found that sums to ${target}`};
}

function* slidingWindowGen(a,k) {
  const n=a.length;
  if(k>n){yield {arr:[...a],hl:{},msg:`Window size ${k} > array length ${n}`}; return;}
  let sum=0;
  for(let i=0;i<k;i++){
    sum+=a[i];
    yield {arr:[...a],hl:{window:[...Array(i+1).keys()]},msg:`Building initial window: add ${a[i]}, sum=${sum}`};
  }
  let maxSum=sum,maxStart=0;
  const initialWin=[...Array(k).keys()];
  yield {arr:[...a],hl:{bestWindow:initialWin,window:initialWin},msg:`Initial window [0..${k-1}] sum=${sum} (current max)`};
  for(let i=k;i<n;i++){
    const remove=a[i-k],add=a[i];
    sum=sum-remove+add;
    const window=[...Array(k).keys()].map(j=>i-k+1+j);
    const bestWin=[...Array(k).keys()].map(j=>maxStart+j);
    yield {arr:[...a],hl:{window,comparing:[i],bestWindow:bestWin},msg:`Slide: remove ${remove}, add ${add} → sum=${sum}`};
    if(sum>maxSum){
      maxSum=sum; maxStart=i-k+1;
      yield {arr:[...a],hl:{bestWindow:window},msg:`New max! Window [${maxStart}..${i}] sum=${maxSum}`};
    } else {
      yield {arr:[...a],hl:{window,bestWindow:bestWin},msg:`Current max still [${maxStart}..${maxStart+k-1}] sum=${maxSum}`};
    }
  }
  const finalBest=[...Array(k).keys()].map(j=>maxStart+j);
  yield {arr:[...a],hl:{bestWindow:finalBest},msg:`Maximum sum ${maxSum} in window [${maxStart}..${maxStart+k-1}] ✓`};
}

function* linearGen(a,target) {
  const elim=[];
  yield {type:'grid',arr:[...a],state:{},msg:`Linear search for target: ${target}`};
  for(let i=0;i<a.length;i++){
    yield {type:'grid',arr:[...a],state:{current:i,eliminated:[...elim]},msg:`Check index ${i}: value = ${a[i]}`};
    if(a[i]===target){
      yield {type:'grid',arr:[...a],state:{found:i,eliminated:[...elim]},msg:`Found ${target} at index ${i} ✓`};
      return;
    }
    elim.push(i);
    yield {type:'grid',arr:[...a],state:{eliminated:[...elim]},msg:`${a[i]} ≠ ${target}, continue...`};
  }
  yield {type:'grid',arr:[...a],state:{eliminated:[...elim]},msg:`${target} not found in array`};
}

function* binaryGen(a,target) {
  let L=0,R=a.length-1; const elim=new Set();
  yield {type:'grid',arr:[...a],state:{left:L,right:R},msg:`Binary search for target: ${target} (array is sorted)`};
  while(L<=R){
    const M=Math.floor((L+R)/2);
    yield {type:'grid',arr:[...a],state:{left:L,right:R,mid:M,eliminated:[...elim]},msg:`L=${L} R=${R} → Mid=${M}, checking ${a[M]}`};
    if(a[M]===target){
      yield {type:'grid',arr:[...a],state:{found:M,eliminated:[...elim]},msg:`Found ${target} at index ${M} ✓`};
      return;
    } else if(a[M]<target){
      for(let i=L;i<=M;i++) elim.add(i);
      yield {type:'grid',arr:[...a],state:{left:M+1,right:R,mid:M,eliminated:[...elim]},msg:`${a[M]} < ${target} → discard left half`};
      L=M+1;
    } else {
      for(let i=M;i<=R;i++) elim.add(i);
      yield {type:'grid',arr:[...a],state:{left:L,right:M-1,mid:M,eliminated:[...elim]},msg:`${a[M]} > ${target} → discard right half`};
      R=M-1;
    }
  }
  yield {type:'grid',arr:[...a],state:{eliminated:[...elim]},msg:`${target} not found in array`};
}

function applyStep(s) {
  if(!s) return;
  if(s.type==='grid') renderGrid(s.arr, s.state||{});
  else                renderBars(s.arr, s.hl||{});
  playSoundForStep(s);
  setStatus(s.msg,'running');
  updateStepInfo();
  highlightCodeLine(getStepLineId(s));
}

function buildSteps() {
  steps=[]; stepIdx=0;
  let gen;
  if      (algo==='bubble')        gen=bubbleGen(arr);
  else if (algo==='selection')     gen=selectionGen(arr);
  else if (algo==='insertion')     gen=insertionGen(arr);
  else if (algo==='merge')         gen=mergeGen(arr);
  else if (algo==='quick')         gen=quickGen(arr);
  else if (algo==='counting')      gen=countingGen(arr);
  else if (algo==='twopointers'){
    const t=parseInt($('targetSumInput').value);
    if(isNaN(t)){setStatus('Enter a target sum first','error'); return false;}
    gen=twoPointersGen(arr,t);
  }
  else if (algo==='slidingwindow') gen=slidingWindowGen(arr,parseInt(windowSlider.value));
  else if (algo==='linear'){
    const t=parseInt($('targetInput').value);
    if(isNaN(t)){setStatus('Enter a search target first','error'); return false;}
    gen=linearGen(arr,t);
  }
  else if (algo==='binary'){
    const t=parseInt($('targetInput').value);
    if(isNaN(t)){setStatus('Enter a search target first','error'); return false;}
    arr=[...arr].sort((a,b)=>a-b);
    gen=binaryGen(arr,t);
  }
  steps=[...gen];
  return true;
}

async function runAll() {
  running=true; paused=false;
  runBtn.disabled=true; stepBtn.disabled=true;
  stepBackBtn.disabled=true;
  pauseBtn.disabled=false; pauseBtn.textContent='Pause';

  while(stepIdx<steps.length){
    if(paused){await sleep(50); continue;}
    if(!running) break;
    applyStep(steps[stepIdx++]);
    await sleep(SPEEDS[speedSlider.value]||160);
  }

  if(running){
    statusDot.className='status-dot done';
    setStatus(steps[steps.length-1]?.msg||'Done ✓','done');
  }
  resetButtonStates();
}

function initArr() {
  if(SEARCH_ALGOS.has(algo)){
    arr=randArr(16);
    if(algo==='binary') arr.sort((a,b)=>a-b);
  } else if(TECHNIQUE_ALGOS.has(algo)){
    arr=randArr(12);
  } else {
    arr=randArr(+sizeSlider.value);
  }
}

function fullReset() {
  running=false; paused=false;
  steps=[]; stepIdx=0;
  initArr();
  if(GRID_ALGOS.has(algo)) renderGrid(arr,{});
  else renderBars(arr,{});
  setStatus('Press Run to begin');
  updateStepInfo();
  resetButtonStates();
  highlightCodeLine(null);
}

const sortSelect=$('sortSelect'), techniqueSelect=$('techniqueSelect'),
      searchSelect=$('searchSelect'), startBtn=$('startBtn'),
      welcomeScreen=$('welcomeScreen'), vizArea=$('vizArea');

function showVizArea(){
  welcomeScreen.classList.add('hidden');
  vizArea.classList.remove('hidden');
  $('logoLink').style.cursor='pointer';
}
function showWelcome(){
  running=false; paused=false;
  welcomeScreen.classList.remove('hidden');
  vizArea.classList.add('hidden');
  $('logoLink').style.cursor='default';
  sortSelect.value=''; techniqueSelect.value=''; searchSelect.value='';
}

startBtn.addEventListener('click',()=>{
  showVizArea();
  sortSelect.value='bubble';
  handleAlgoChange('bubble');
});

function handleAlgoChange(selectedAlgo) {
  if(!selectedAlgo) return;
  if(running&&!paused) return;
  showVizArea();
  sortSelect.value      = SORT_ALGOS.has(selectedAlgo)      ? selectedAlgo:'';
  techniqueSelect.value = TECHNIQUE_ALGOS.has(selectedAlgo) ? selectedAlgo:'';
  searchSelect.value    = SEARCH_ALGOS.has(selectedAlgo)    ? selectedAlgo:'';
  algo=selectedAlgo;
  updateSidebar(algo);
  buildCodePanel(algo);
  fullReset();
}

sortSelect.addEventListener('change',      e=>{if(e.target.value) handleAlgoChange(e.target.value);});
techniqueSelect.addEventListener('change', e=>{if(e.target.value) handleAlgoChange(e.target.value);});
searchSelect.addEventListener('change',    e=>{if(e.target.value) handleAlgoChange(e.target.value);});

sizeSlider.addEventListener('input',()=>{sizeVal.textContent=sizeSlider.value; if(!running) fullReset();});
speedSlider.addEventListener('input',()=>{speedVal.textContent=SPEED_LABELS[speedSlider.value];});
windowSlider.addEventListener('input',()=>{windowSizeVal.textContent=windowSlider.value;});

$('applyCustom').addEventListener('click',()=>{
  const vals=$('customInput').value.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)&&n>0&&n<=999);
  if(vals.length<2){setStatus('Enter at least 2 numbers','error'); return;}
  if(vals.length>60){setStatus('Max 60 elements','error'); return;}
  arr=vals;
  if(SORT_ALGOS.has(algo)){sizeSlider.value=vals.length; sizeVal.textContent=vals.length;}
  steps=[]; stepIdx=0;
  if(GRID_ALGOS.has(algo)) renderGrid(arr,{});
  else renderBars(arr,{});
  setStatus('Custom array set — press Run');
  updateStepInfo();
});

runBtn.addEventListener('click',()=>{
  if(!buildSteps()) return;
  if(GRID_ALGOS.has(algo)) renderGrid(arr,{});
  else renderBars(arr,{});
  setStatus('Running…','running');
  runAll();
});

// FIX 5: updateStepInfo() called unconditionally at end
stepBtn.addEventListener('click',()=>{
  if(!steps.length||stepIdx>=steps.length){
    if(!buildSteps()) return;
    if(GRID_ALGOS.has(algo)) renderGrid(arr,{});
    else renderBars(arr,{});
  }
  if(stepIdx<steps.length) applyStep(steps[stepIdx++]);
  stepBackBtn.disabled=(stepIdx<=0);
  if(stepIdx>=steps.length){
    statusDot.className='status-dot done';
    stepBtn.disabled=true;
  }
  updateStepInfo(); // FIXED: always sync the counter
});

stepBackBtn.addEventListener('click',()=>{
  if(!steps.length||stepIdx<=0) return;
  stepIdx--;
  if(stepIdx===0){
    if(GRID_ALGOS.has(algo)) renderGrid(arr,{});
    else renderBars(arr,{});
    setStatus('Press Run to begin');
    statusDot.className='status-dot';
    stepBackBtn.disabled=true;
  } else {
    applyStep(steps[stepIdx-1]);
    stepBackBtn.disabled=false;
  }
  stepBtn.disabled=false;
  updateStepInfo();
});

pauseBtn.addEventListener('click',()=>{
  if(!running) return;
  paused=!paused;
  pauseBtn.textContent=paused?'Resume':'Pause';
  if(paused) setStatus('Paused','idle'); else setStatus('Running…','running');
});

resetBtn.addEventListener('click',()=>fullReset());
shuffleBtn.addEventListener('click',()=>fullReset());
$('logoLink').addEventListener('click',()=>{if(vizArea&&!vizArea.classList.contains('hidden')) showWelcome();});

const ro=new ResizeObserver(()=>{
  if(!arr.length||vizArea.classList.contains('hidden')) return;
  const lastStep=steps[stepIdx-1];
  if(lastStep) applyStep(lastStep);
  else if(GRID_ALGOS.has(algo)) renderGrid(arr,{});
  else renderBars(arr,{});
});
ro.observe($('vizCanvas'));

function applyPreset(type) {
  if(running&&!paused) return;
  const n=+sizeSlider.value;
  if     (type==='best')  arr=Array.from({length:n},(_,i)=>Math.round(10+(i/(n-1))*89));
  else if(type==='worst') arr=Array.from({length:n},(_,i)=>Math.round(99-(i/(n-1))*89));
  else if(type==='avg')   arr=randArr(n);
  else if(type==='equal'){const v=rand(30,70); arr=Array(n).fill(v);}
  steps=[]; stepIdx=0;
  renderBars(arr,{});
  setStatus('Preset loaded — press Run');
  updateStepInfo();
}
$('presetBest') .addEventListener('click',()=>applyPreset('best'));
$('presetAvg')  .addEventListener('click',()=>applyPreset('avg'));
$('presetWorst').addEventListener('click',()=>applyPreset('worst'));
$('presetEqual').addEventListener('click',()=>applyPreset('equal'));

// FIX 6: Use .theme-toggle-label class instead of span:last-child
let isDark=true;
function applyTheme(dark) {
  isDark=dark;
  document.documentElement.setAttribute('data-theme',dark?'dark':'');
  const icon=dark?'☀':'☾', label=dark?'Light':'Dark';
  [$('themeToggle'),$('welcomeThemeToggle')].forEach(btn=>{
    if(!btn) return;
    btn.querySelector('.theme-toggle-icon').textContent =icon;
    btn.querySelector('.theme-toggle-label').textContent=label; // FIXED
  });
}
$('themeToggle').addEventListener('click',       ()=>applyTheme(!isDark));
$('welcomeThemeToggle').addEventListener('click',()=>applyTheme(!isDark));

const soundToggle=$('soundToggle');
let soundOn=false, audioCtx=null;

function getAudioCtx(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}
function valToFreq(v,maxV){return 220+((v-10)/Math.max(maxV-10,1))*660;}
function playTone(freq,type='sine',durationMs=80,volume=0.12){
  if(!soundOn) return;
  try{
    const ctx=getAudioCtx(),osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type=type;
    osc.frequency.setValueAtTime(freq,ctx.currentTime);
    gain.gain.setValueAtTime(volume,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+durationMs/1000);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime+durationMs/1000);
  }catch(e){}
}
function playSoundForStep(s){
  if(!soundOn||!s) return;
  const maxV=s.arr?Math.max(...s.arr,1):99;
  if(s.type==='grid'){
    const idx=s.state?.current??s.state?.mid??s.state?.found;
    if(idx!=null&&s.arr?.[idx]){
      playTone(valToFreq(s.arr[idx],maxV),s.state?.found!=null?'triangle':'sine',100,.1);
    }
  } else {
    const hl=s.hl||{};
    if     (hl.swapping?.length)  playTone(valToFreq(s.arr[hl.swapping[0]],maxV),'sawtooth',90,.08);
    else if(hl.comparing?.length) playTone(valToFreq(s.arr[hl.comparing[0]],maxV),'sine',60,.07);
    else if(hl.sorted?.length)    playTone(valToFreq(s.arr[hl.sorted[hl.sorted.length-1]],maxV),'triangle',120,.1);
  }
}
function updateSoundToggleUI() {
  soundToggle.classList.toggle('active', soundOn);
  soundToggle.querySelector('.sound-toggle-icon').textContent  = soundOn ? '🔊' : '🔇';
  soundToggle.querySelector('.sound-toggle-label').textContent = soundOn ? 'On' : 'Off';
}
soundToggle.addEventListener('click', () => {
  soundOn = !soundOn;
  updateSoundToggleUI();
  if (soundOn) { try { getAudioCtx().resume(); } catch(e) {} playTone(440, 'sine', 150, .1); }
});

const k  = (s) => `<span class="kw">${s}</span>`;
const fn = (s) => `<span class="fn">${s}</span>`;
const cm = (s) => `<span class="cm">// ${s}</span>`;
const nm = (s) => `<span class="nm">${s}</span>`;

const CODE_SNIPPETS = {
  pseudo: {
    bubble: [
      [null,       `${k('procedure')} ${fn('bubbleSort')}(A)`],
      [null,       `  n ← length(A)`],
      [null,       `  ${k('for')} i ← 0 ${k('to')} n−2 ${k('do')}`],
      ['comparing',`    ${k('for')} j ← 0 ${k('to')} n−i−2 ${k('do')}`],
      ['comparing',`      ${k('if')} A[j] > A[j+1] ${k('then')}`],
      ['swapping', `        swap(A[j], A[j+1])`],
      [null,       `      ${k('end if')}`],
      [null,       `    ${k('end for')}`],
      ['sorted',   `    ${cm('largest element bubbled to end')}`],
      [null,       `  ${k('end for')}`],
      [null,       `${k('end procedure')}`],
    ],
    selection: [
      [null,       `${k('procedure')} ${fn('selectionSort')}(A)`],
      [null,       `  n ← length(A)`],
      [null,       `  ${k('for')} i ← 0 ${k('to')} n−2 ${k('do')}`],
      ['current',  `    minIdx ← i  ${cm('assume leftmost is min')}`],
      ['comparing',`    ${k('for')} j ← i+1 ${k('to')} n−1 ${k('do')}`],
      ['comparing',`      ${k('if')} A[j] < A[minIdx] ${k('then')}`],
      ['current',  `        minIdx ← j  ${cm('new minimum found')}`],
      [null,       `      ${k('end if')}`],
      [null,       `    ${k('end for')}`],
      ['swapping', `    swap(A[i], A[minIdx])`],
      ['sorted',   `    ${cm('A[0..i] is now sorted')}`],
      [null,       `  ${k('end for')}`],
      [null,       `${k('end procedure')}`],
    ],
    insertion: [
      [null,       `${k('procedure')} ${fn('insertionSort')}(A)`],
      [null,       `  n ← length(A)`],
      [null,       `  ${k('for')} i ← 1 ${k('to')} n−1 ${k('do')}`],
      ['pivot',    `    key ← A[i]  ${cm('element to insert')}`],
      [null,       `    j ← i − 1`],
      ['comparing',`    ${k('while')} j ≥ 0 ${k('and')} A[j] > key ${k('do')}`],
      ['comparing',`      A[j+1] ← A[j]  ${cm('shift right')}`],
      ['comparing',`      j ← j − 1`],
      [null,       `    ${k('end while')}`],
      ['sorted',   `    A[j+1] ← key  ${cm('place key in gap')}`],
      [null,       `  ${k('end for')}`],
      [null,       `${k('end procedure')}`],
    ],
    merge: [
      [null,       `${k('procedure')} ${fn('mergeSort')}(A, l, r)`],
      [null,       `  ${k('if')} l ≥ r ${k('then return')}`],
      [null,       `  mid ← ⌊(l + r) / 2⌋`],
      ['leftpart', `  ${fn('mergeSort')}(A, l, mid)    ${cm('sort left')}`],
      ['rightpart',`  ${fn('mergeSort')}(A, mid+1, r)  ${cm('sort right')}`],
      ['comparing',`  ${fn('merge')}(A, l, mid, r)     ${cm('combine')}`],
      [null,       ``],
      [null,       `${k('procedure')} ${fn('merge')}(A, l, mid, r)`],
      [null,       `  L ← A[l..mid],  R ← A[mid+1..r]`],
      ['comparing',`  ${k('while')} both halves have elements ${k('do')}`],
      ['comparing',`    pick smaller of L[i], R[j] → A[k]`],
      ['sorted',   `  copy remaining elements back`],
      [null,       `${k('end procedure')}`],
    ],
    quick: [
      [null,       `${k('procedure')} ${fn('quickSort')}(A, lo, hi)`],
      [null,       `  ${k('if')} lo ≥ hi ${k('then return')}`],
      ['pivot',    `  pivot ← A[hi]  ${cm('choose pivot')}`],
      [null,       `  i ← lo − 1`],
      ['comparing',`  ${k('for')} j ← lo ${k('to')} hi−1 ${k('do')}`],
      ['comparing',`    ${k('if')} A[j] ≤ pivot ${k('then')}`],
      ['swapping', `      i ← i+1;  swap(A[i], A[j])`],
      [null,       `    ${k('end if')}`],
      [null,       `  ${k('end for')}`],
      ['sorted',   `  swap(A[i+1], A[hi])  ${cm('pivot → final pos')}`],
      [null,       `  p ← i + 1`],
      [null,       `  ${fn('quickSort')}(A, lo, p−1)`],
      [null,       `  ${fn('quickSort')}(A, p+1, hi)`],
      [null,       `${k('end procedure')}`],
    ],
    counting: [
      [null,       `${k('procedure')} ${fn('countingSort')}(A)`],
      [null,       `  min ← ${fn('min')}(A),  max ← ${fn('max')}(A)`],
      [null,       `  count[0..max−min] ← 0`],
      ['bucket',   `  ${k('for each')} x ${k('in')} A ${k('do')}`],
      ['bucket',   `    count[x − min] ← count[x − min] + 1`],
      [null,       `  ${k('end for')}  ${cm('frequency table built')}`],
      [null,       `  k ← 0  ${cm('output index')}`],
      ['comparing',`  ${k('for')} i ← 0 ${k('to')} max−min ${k('do')}`],
      ['comparing',`    ${k('repeat')} count[i] ${k('times')}:`],
      ['comparing',`      A[k] ← i + min;  k ← k + 1`],
      [null,       `  ${k('end for')}`],
      ['sorted',   `  ${cm('A is now sorted')}`],
      [null,       `${k('end procedure')}`],
    ],
    twopointers: [
      [null,       `${k('procedure')} ${fn('twoPointers')}(A, target)`],
      [null,       `  ${fn('sort')}(A)`],
      [null,       `  L ← 0,  R ← length(A) − 1`],
      ['leftptr',  `  ${k('while')} L < R ${k('do')}`],
      ['comparing',`    sum ← A[L] + A[R]`],
      ['found',    `    ${k('if')} sum = target ${k('then')}`],
      ['found',    `      ${k('return')} (L, R)  ${cm('pair found!')}`],
      ['leftptr',  `    ${k('else if')} sum < target ${k('then')}`],
      ['leftptr',  `      L ← L + 1  ${cm('need larger sum')}`],
      ['rightptr', `    ${k('else')}`],
      ['rightptr', `      R ← R − 1  ${cm('need smaller sum')}`],
      [null,       `    ${k('end if')}`],
      [null,       `  ${k('end while')}`],
      [null,       `  ${k('return')} null  ${cm('no pair found')}`],
      [null,       `${k('end procedure')}`],
    ],
    slidingwindow: [
      [null,        `${k('procedure')} ${fn('slidingWindow')}(A, k)`],
      [null,        `  ${cm('build initial window')}`],
      ['window',    `  windowSum ← ${fn('sum')}(A[0..k−1])`],
      [null,        `  maxSum ← windowSum,  maxStart ← 0`],
      ['comparing', `  ${k('for')} i ← k ${k('to')} n−1 ${k('do')}`],
      ['comparing', `    ${cm('slide: add A[i], remove A[i−k]')}`],
      ['comparing', `    windowSum ← windowSum + A[i] − A[i−k]`],
      ['bestWindow',`    ${k('if')} windowSum > maxSum ${k('then')}`],
      ['bestWindow',`      maxSum ← windowSum`],
      ['bestWindow',`      maxStart ← i − k + 1`],
      [null,        `    ${k('end if')}`],
      [null,        `  ${k('end for')}`],
      [null,        `  ${k('return')} maxSum, maxStart`],
      [null,        `${k('end procedure')}`],
    ],
    linear: [
      [null,        `${k('procedure')} ${fn('linearSearch')}(A, target)`],
      [null,        `  n ← length(A)`],
      ['current',   `  ${k('for')} i ← 0 ${k('to')} n−1 ${k('do')}`],
      ['current',   `    ${k('if')} A[i] = target ${k('then')}`],
      ['found',     `      ${k('return')} i  ${cm('found at index i')}`],
      [null,        `    ${k('end if')}`],
      ['eliminated',`    ${cm('A[i] ≠ target, continue')}`],
      [null,        `  ${k('end for')}`],
      [null,        `  ${k('return')} −1  ${cm('not found')}`],
      [null,        `${k('end procedure')}`],
    ],
    binary: [
      [null,        `${k('procedure')} ${fn('binarySearch')}(A, target)`],
      [null,        `  ${cm('A must be sorted')}`],
      [null,        `  L ← 0,  R ← length(A) − 1`],
      ['mid',       `  ${k('while')} L ≤ R ${k('do')}`],
      ['mid',       `    mid ← ⌊(L + R) / 2⌋`],
      ['found',     `    ${k('if')} A[mid] = target ${k('then')}`],
      ['found',     `      ${k('return')} mid  ${cm('found!')}`],
      ['left',      `    ${k('else if')} A[mid] < target ${k('then')}`],
      ['left',      `      L ← mid + 1  ${cm('discard left half')}`],
      ['right',     `    ${k('else')}`],
      ['right',     `      R ← mid − 1  ${cm('discard right half')}`],
      [null,        `    ${k('end if')}`],
      [null,        `  ${k('end while')}`],
      [null,        `  ${k('return')} −1  ${cm('not found')}`],
      [null,        `${k('end procedure')}`],
    ],
  },
  python: { bubble:[[null,`${k('def')} ${fn('bubble_sort')}(arr):`],[null,`    n = len(arr)`],[null,`    ${k('for')} i ${k('in')} range(n - ${nm('1')}):`],['comparing',`        ${k('for')} j ${k('in')} range(n - i - ${nm('1')}):`],['comparing',`            ${k('if')} arr[j] > arr[j + ${nm('1')}]:`],['swapping',`                arr[j], arr[j+${nm('1')}] = arr[j+${nm('1')}], arr[j]`],['sorted',`    ${cm('pass i bubbles largest to end')}`],[null,`    ${k('return')} arr`]],selection:[[null,`${k('def')} ${fn('selection_sort')}(arr):`],[null,`    n = len(arr)`],[null,`    ${k('for')} i ${k('in')} range(n):`],['current',`        min_idx = i`],['comparing',`        ${k('for')} j ${k('in')} range(i + ${nm('1')}, n):`],['comparing',`            ${k('if')} arr[j] < arr[min_idx]:`],['current',`                min_idx = j`],['swapping',`        arr[i], arr[min_idx] = arr[min_idx], arr[i]`],['sorted',`    ${cm('arr[0..i] is sorted')}`],[null,`    ${k('return')} arr`]],insertion:[[null,`${k('def')} ${fn('insertion_sort')}(arr):`],[null,`    ${k('for')} i ${k('in')} range(${nm('1')}, len(arr)):`],['pivot',`        key = arr[i]`],[null,`        j = i - ${nm('1')}`],['comparing',`        ${k('while')} j >= ${nm('0')} ${k('and')} arr[j] > key:`],['comparing',`            arr[j + ${nm('1')}] = arr[j]`],['comparing',`            j -= ${nm('1')}`],['sorted',`        arr[j + ${nm('1')}] = key`],[null,`    ${k('return')} arr`]],merge:[[null,`${k('def')} ${fn('merge_sort')}(arr):`],[null,`    ${k('if')} len(arr) <= ${nm('1')}: ${k('return')} arr`],[null,`    mid = len(arr) // ${nm('2')}`],['leftpart',`    left  = ${fn('merge_sort')}(arr[:mid])`],['rightpart',`    right = ${fn('merge_sort')}(arr[mid:])`],['comparing',`    ${k('return')} ${fn('merge')}(left, right)`],[null,``],[null,`${k('def')} ${fn('merge')}(left, right):`],[null,`    result, i, j = [], ${nm('0')}, ${nm('0')}`],['comparing',`    ${k('while')} i < len(left) ${k('and')} j < len(right):`],['comparing',`        ${k('if')} left[i] <= right[j]: result.append(left[i]); i += ${nm('1')}`],['comparing',`        ${k('else')}:                   result.append(right[j]); j += ${nm('1')}`],['sorted',`    ${k('return')} result + left[i:] + right[j:]`]],quick:[[null,`${k('def')} ${fn('quick_sort')}(arr, lo, hi):`],[null,`    ${k('if')} lo >= hi: ${k('return')}`],['pivot',`    pivot = arr[hi]  ${cm('choose last as pivot')}`],[null,`    i = lo - ${nm('1')}`],['comparing',`    ${k('for')} j ${k('in')} range(lo, hi):`],['comparing',`        ${k('if')} arr[j] <= pivot:`],['swapping',`            i += ${nm('1')}; arr[i], arr[j] = arr[j], arr[i]`],['sorted',`    arr[i+${nm('1')}], arr[hi] = arr[hi], arr[i+${nm('1')}]`],[null,`    p = i + ${nm('1')}`],[null,`    ${fn('quick_sort')}(arr, lo, p - ${nm('1')})`],[null,`    ${fn('quick_sort')}(arr, p + ${nm('1')}, hi)`]],counting:[[null,`${k('def')} ${fn('counting_sort')}(arr):`],[null,`    mn, mx = min(arr), max(arr)`],[null,`    count = [${nm('0')}] * (mx - mn + ${nm('1')})`],['bucket',`    ${k('for')} x ${k('in')} arr:`],['bucket',`        count[x - mn] += ${nm('1')}`],[null,`    output, k = [], ${nm('0')}`],['comparing',`    ${k('for')} i, c ${k('in')} enumerate(count):`],['comparing',`        output.extend([i + mn] * c)`],['sorted',`    ${k('return')} output  ${cm('sorted array')}`]],twopointers:[[null,`${k('def')} ${fn('two_pointers')}(arr, target):`],[null,`    arr.sort()`],[null,`    L, R = ${nm('0')}, len(arr) - ${nm('1')}`],['leftptr',`    ${k('while')} L < R:`],['comparing',`        s = arr[L] + arr[R]`],['found',`        ${k('if')} s == target:`],['found',`            ${k('return')} (L, R)  ${cm('pair found')}`],['leftptr',`        ${k('elif')} s < target:`],['leftptr',`            L += ${nm('1')}  ${cm('need larger sum')}`],['rightptr',`        ${k('else')}:`],['rightptr',`            R -= ${nm('1')}  ${cm('need smaller sum')}`],[null,`    ${k('return')} ${k('None')}  ${cm('no pair found')}`]],slidingwindow:[[null,`${k('def')} ${fn('sliding_window')}(arr, k):`],['window',`    win_sum = sum(arr[:k])`],[null,`    max_sum, max_start = win_sum, ${nm('0')}`],['comparing',`    ${k('for')} i ${k('in')} range(k, len(arr)):`],['comparing',`        win_sum += arr[i] - arr[i - k]`],['bestWindow',`        ${k('if')} win_sum > max_sum:`],['bestWindow',`            max_sum  = win_sum`],['bestWindow',`            max_start = i - k + ${nm('1')}`],[null,`    ${k('return')} max_sum, max_start`]],linear:[[null,`${k('def')} ${fn('linear_search')}(arr, target):`],['current',`    ${k('for')} i, val ${k('in')} enumerate(arr):`],['current',`        ${k('if')} val == target:`],['found',`            ${k('return')} i  ${cm('found')}`],['eliminated',`    ${cm('not a match, keep going')}`],[null,`    ${k('return')} -${nm('1')}  ${cm('not found')}`]],binary:[[null,`${k('def')} ${fn('binary_search')}(arr, target):`],[null,`    L, R = ${nm('0')}, len(arr) - ${nm('1')}`],['mid',`    ${k('while')} L <= R:`],['mid',`        mid = (L + R) // ${nm('2')}`],['found',`        ${k('if')} arr[mid] == target:`],['found',`            ${k('return')} mid  ${cm('found!')}`],['left',`        ${k('elif')} arr[mid] < target:`],['left',`            L = mid + ${nm('1')}  ${cm('discard left')}`],['right',`        ${k('else')}:`],['right',`            R = mid - ${nm('1')}  ${cm('discard right')}`],[null,`    ${k('return')} -${nm('1')}  ${cm('not found')}`]]},
  cpp: {
    bubble: [
      [null,       `${k('void')} ${fn('bubbleSort')}(${k('int')} arr[], ${k('int')} n) {`],
      [null,       `    ${k('for')} (${k('int')} i = ${nm('0')}; i < n-${nm('1')}; i++) {`],
      ['comparing',`        ${k('for')} (${k('int')} j = ${nm('0')}; j < n-i-${nm('1')}; j++) {`],
      ['comparing',`            ${k('if')} (arr[j] > arr[j+${nm('1')}]) {`],
      ['swapping', `                swap(arr[j], arr[j+${nm('1')}]);`],
      [null,       `            }`],
      [null,       `        }`],
      ['sorted',   `        ${cm('arr[n-i-1] is in final position')}`],
      [null,       `    }`],
      [null,       `}`],
    ],
    selection: [
      [null,       `${k('void')} ${fn('selectionSort')}(${k('int')} arr[], ${k('int')} n) {`],
      [null,       `    ${k('for')} (${k('int')} i = ${nm('0')}; i < n-${nm('1')}; i++) {`],
      ['current',  `        ${k('int')} minIdx = i;`],
      ['comparing',`        ${k('for')} (${k('int')} j = i+${nm('1')}; j < n; j++)`],
      ['comparing',`            ${k('if')} (arr[j] < arr[minIdx]) minIdx = j;`],
      ['current',  `        ${cm('minIdx holds position of minimum')}`],
      ['swapping', `        swap(arr[i], arr[minIdx]);`],
      ['sorted',   `        ${cm('arr[0..i] is sorted')}`],
      [null,       `    }`],
      [null,       `}`],
    ],
    insertion: [
      [null,       `${k('void')} ${fn('insertionSort')}(${k('int')} arr[], ${k('int')} n) {`],
      [null,       `    ${k('for')} (${k('int')} i = ${nm('1')}; i < n; i++) {`],
      ['pivot',    `        ${k('int')} key = arr[i];`],
      [null,       `        ${k('int')} j = i - ${nm('1')};`],
      ['comparing',`        ${k('while')} (j >= ${nm('0')} && arr[j] > key) {`],
      ['comparing',`            arr[j+${nm('1')}] = arr[j];`],
      ['comparing',`            j--;`],
      [null,       `        }`],
      ['sorted',   `        arr[j+${nm('1')}] = key;`],
      [null,       `    }`],
      [null,       `}`],
    ],
    merge: [
      [null,       `${k('void')} ${fn('merge')}(${k('int')} A[], ${k('int')} l, ${k('int')} m, ${k('int')} r) {`],
      [null,       `    vector<${k('int')}> L(A+l, A+m+${nm('1')}), R(A+m+${nm('1')}, A+r+${nm('1')});`],
      [null,       `    ${k('int')} i=${nm('0')}, j=${nm('0')}, k=l;`],
      ['comparing',`    ${k('while')} (i<L.size() && j<R.size())`],
      ['comparing',`        A[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];`],
      ['sorted',   `    ${k('while')} (i<L.size()) A[k++]=L[i++];`],
      ['sorted',   `    ${k('while')} (j<R.size()) A[k++]=R[j++];`],
      [null,       `}`],
      [null,       ``],
      [null,       `${k('void')} ${fn('mergeSort')}(${k('int')} A[], ${k('int')} l, ${k('int')} r) {`],
      [null,       `    ${k('if')} (l >= r) ${k('return')};`],
      [null,       `    ${k('int')} m = (l + r) / ${nm('2')};`],
      ['leftpart', `    ${fn('mergeSort')}(A, l, m);`],
      ['rightpart',`    ${fn('mergeSort')}(A, m+${nm('1')}, r);`],
      ['comparing',`    ${fn('merge')}(A, l, m, r);`],
      [null,       `}`],
    ],
    quick: [
      [null,       `${k('int')} ${fn('partition')}(${k('int')} A[], ${k('int')} lo, ${k('int')} hi) {`],
      ['pivot',    `    ${k('int')} pivot = A[hi];`],
      [null,       `    ${k('int')} i = lo - ${nm('1')};`],
      ['comparing',`    ${k('for')} (${k('int')} j = lo; j < hi; j++) {`],
      ['comparing',`        ${k('if')} (A[j] <= pivot)`],
      ['swapping', `            swap(A[++i], A[j]);`],
      [null,       `    }`],
      ['sorted',   `    swap(A[i+${nm('1')}], A[hi]); ${k('return')} i+${nm('1')};`],
      [null,       `}`],
      [null,       `${k('void')} ${fn('quickSort')}(${k('int')} A[], ${k('int')} lo, ${k('int')} hi) {`],
      [null,       `    ${k('if')} (lo >= hi) ${k('return')};`],
      [null,       `    ${k('int')} p = ${fn('partition')}(A, lo, hi);`],
      [null,       `    ${fn('quickSort')}(A, lo, p-${nm('1')}); ${fn('quickSort')}(A, p+${nm('1')}, hi);`],
      [null,       `}`],
    ],
    counting: [
      [null,       `${k('void')} ${fn('countingSort')}(${k('int')} A[], ${k('int')} n) {`],
      [null,       `    ${k('int')} mn=*min_element(A,A+n), mx=*max_element(A,A+n);`],
      [null,       `    vector<${k('int')}> count(mx-mn+${nm('1')}, ${nm('0')});`],
      ['bucket',   `    ${k('for')} (${k('int')} i=${nm('0')}; i<n; i++)`],
      ['bucket',   `        count[A[i]-mn]++;`],
      [null,       `    ${k('int')} k = ${nm('0')};`],
      ['comparing',`    ${k('for')} (${k('int')} i=${nm('0')}; i<count.size(); i++)`],
      ['comparing',`        ${k('while')} (count[i]--) A[k++] = i + mn;`],
      ['sorted',   `    ${cm('A is now sorted')}`],
      [null,       `}`],
    ],
    twopointers: [
      [null,       `${k('pair')}<${k('int')},${k('int')}> ${fn('twoPointers')}(${k('int')} A[], ${k('int')} n, ${k('int')} target) {`],
      [null,       `    sort(A, A+n);`],
      [null,       `    ${k('int')} L=${nm('0')}, R=n-${nm('1')};`],
      ['leftptr',  `    ${k('while')} (L < R) {`],
      ['comparing',`        ${k('int')} s = A[L] + A[R];`],
      ['found',    `        ${k('if')} (s == target) ${k('return')} {L, R};`],
      ['leftptr',  `        ${k('if')} (s < target)  L++;  ${cm('need larger')}`],
      ['rightptr', `        ${k('else')}              R--;  ${cm('need smaller')}`],
      [null,       `    }`],
      [null,       `    ${k('return')} {-${nm('1')}, -${nm('1')}};  ${cm('not found')}`],
      [null,       `}`],
    ],
    slidingwindow: [
      [null,        `${k('pair')}<${k('int')},${k('int')}> ${fn('slidingWindow')}(${k('int')} A[], ${k('int')} n, ${k('int')} k) {`],
      ['window',    `    ${k('int')} winSum=${nm('0')}; ${k('for')}(${k('int')} i=${nm('0')};i<k;i++) winSum+=A[i];`],
      [null,        `    ${k('int')} maxSum=winSum, maxStart=${nm('0')};`],
      ['comparing', `    ${k('for')} (${k('int')} i=k; i<n; i++) {`],
      ['comparing', `        winSum += A[i] - A[i-k];`],
      ['bestWindow',`        ${k('if')} (winSum > maxSum) {`],
      ['bestWindow',`            maxSum=winSum; maxStart=i-k+${nm('1')};`],
      [null,        `        }`],
      [null,        `    }`],
      [null,        `    ${k('return')} {maxSum, maxStart};`],
      [null,        `}`],
    ],
    linear: [
      [null,        `${k('int')} ${fn('linearSearch')}(${k('int')} arr[], ${k('int')} n, ${k('int')} target) {`],
      ['current',   `    ${k('for')} (${k('int')} i=${nm('0')}; i<n; i++) {`],
      ['current',   `        ${k('if')} (arr[i] == target)`],
      ['found',     `            ${k('return')} i;  ${cm('found at index i')}`],
      ['eliminated',`        ${cm('arr[i] != target, continue')}`],
      [null,        `    }`],
      [null,        `    ${k('return')} -${nm('1')};  ${cm('not found')}`],
      [null,        `}`],
    ],
    binary: [
      [null,        `${k('int')} ${fn('binarySearch')}(${k('int')} arr[], ${k('int')} n, ${k('int')} target) {`],
      [null,        `    ${k('int')} L=${nm('0')}, R=n-${nm('1')};`],
      ['mid',       `    ${k('while')} (L <= R) {`],
      ['mid',       `        ${k('int')} mid = (L + R) / ${nm('2')};`],
      ['found',     `        ${k('if')} (arr[mid] == target) ${k('return')} mid;`],
      ['left',      `        ${k('if')} (arr[mid] < target)  L = mid + ${nm('1')};`],
      ['right',     `        ${k('else')}                    R = mid - ${nm('1')};`],
      [null,        `    }`],
      [null,        `    ${k('return')} -${nm('1')};  ${cm('not found')}`],
      [null,        `}`],
    ],
  },
  java: {
    bubble: [
      [null,       `${k('static void')} ${fn('bubbleSort')}(${k('int')}[] arr) {`],
      [null,       `    ${k('int')} n = arr.length;`],
      [null,       `    ${k('for')} (${k('int')} i = ${nm('0')}; i < n-${nm('1')}; i++) {`],
      ['comparing',`        ${k('for')} (${k('int')} j = ${nm('0')}; j < n-i-${nm('1')}; j++) {`],
      ['comparing',`            ${k('if')} (arr[j] > arr[j+${nm('1')}]) {`],
      ['swapping', `                ${k('int')} tmp=arr[j]; arr[j]=arr[j+${nm('1')}]; arr[j+${nm('1')}]=tmp;`],
      [null,       `            }`],
      [null,       `        }`],
      ['sorted',   `        ${cm('arr[n-i-1] is in final position')}`],
      [null,       `    }`],
      [null,       `}`],
    ],
    selection: [
      [null,       `${k('static void')} ${fn('selectionSort')}(${k('int')}[] arr) {`],
      [null,       `    ${k('int')} n = arr.length;`],
      [null,       `    ${k('for')} (${k('int')} i = ${nm('0')}; i < n-${nm('1')}; i++) {`],
      ['current',  `        ${k('int')} minIdx = i;`],
      ['comparing',`        ${k('for')} (${k('int')} j = i+${nm('1')}; j < n; j++)`],
      ['comparing',`            ${k('if')} (arr[j] < arr[minIdx]) minIdx = j;`],
      ['swapping', `        ${k('int')} tmp=arr[i]; arr[i]=arr[minIdx]; arr[minIdx]=tmp;`],
      ['sorted',   `        ${cm('arr[0..i] is sorted')}`],
      [null,       `    }`],
      [null,       `}`],
    ],
    insertion: [
      [null,       `${k('static void')} ${fn('insertionSort')}(${k('int')}[] arr) {`],
      [null,       `    ${k('for')} (${k('int')} i = ${nm('1')}; i < arr.length; i++) {`],
      ['pivot',    `        ${k('int')} key = arr[i];`],
      [null,       `        ${k('int')} j = i - ${nm('1')};`],
      ['comparing',`        ${k('while')} (j >= ${nm('0')} && arr[j] > key) {`],
      ['comparing',`            arr[j+${nm('1')}] = arr[j];`],
      ['comparing',`            j--;`],
      [null,       `        }`],
      ['sorted',   `        arr[j+${nm('1')}] = key;`],
      [null,       `    }`],
      [null,       `}`],
    ],
    merge: [
      [null,       `${k('static void')} ${fn('mergeSort')}(${k('int')}[] A, ${k('int')} l, ${k('int')} r) {`],
      [null,       `    ${k('if')} (l >= r) ${k('return')};`],
      [null,       `    ${k('int')} m = (l + r) / ${nm('2')};`],
      ['leftpart', `    ${fn('mergeSort')}(A, l, m);`],
      ['rightpart',`    ${fn('mergeSort')}(A, m+${nm('1')}, r);`],
      ['comparing',`    ${fn('merge')}(A, l, m, r);`],
      [null,       `}`],
      [null,       ``],
      [null,       `${k('static void')} ${fn('merge')}(${k('int')}[] A, ${k('int')} l, ${k('int')} m, ${k('int')} r) {`],
      [null,       `    ${k('int')}[] L = Arrays.copyOfRange(A,l,m+${nm('1')});`],
      [null,       `    ${k('int')}[] R = Arrays.copyOfRange(A,m+${nm('1')},r+${nm('1')});`],
      ['comparing',`    ${k('int')} i=${nm('0')}, j=${nm('0')}, k=l;`],
      ['comparing',`    ${k('while')} (i<L.length && j<R.length)`],
      ['comparing',`        A[k++] = (L[i]<=R[j]) ? L[i++] : R[j++];`],
      ['sorted',   `    ${k('while')} (i<L.length) A[k++]=L[i++];`],
      ['sorted',   `    ${k('while')} (j<R.length) A[k++]=R[j++];`],
      [null,       `}`],
    ],
    quick: [
      [null,       `${k('static int')} ${fn('partition')}(${k('int')}[] A, ${k('int')} lo, ${k('int')} hi) {`],
      ['pivot',    `    ${k('int')} pivot = A[hi], i = lo - ${nm('1')};`],
      ['comparing',`    ${k('for')} (${k('int')} j = lo; j < hi; j++) {`],
      ['comparing',`        ${k('if')} (A[j] <= pivot) {`],
      ['swapping', `            i++; ${k('int')} tmp=A[i]; A[i]=A[j]; A[j]=tmp;`],
      [null,       `        }`],
      [null,       `    }`],
      ['sorted',   `    ${k('int')} tmp=A[i+${nm('1')}]; A[i+${nm('1')}]=A[hi]; A[hi]=tmp;`],
      [null,       `    ${k('return')} i + ${nm('1')};`],
      [null,       `}`],
      [null,       `${k('static void')} ${fn('quickSort')}(${k('int')}[] A, ${k('int')} lo, ${k('int')} hi) {`],
      [null,       `    ${k('if')} (lo >= hi) ${k('return')};`],
      [null,       `    ${k('int')} p = ${fn('partition')}(A, lo, hi);`],
      [null,       `    ${fn('quickSort')}(A, lo, p-${nm('1')}); ${fn('quickSort')}(A, p+${nm('1')}, hi);`],
      [null,       `}`],
    ],
    counting: [
      [null,       `${k('static void')} ${fn('countingSort')}(${k('int')}[] A) {`],
      [null,       `    ${k('int')} mn=A[${nm('0')}], mx=A[${nm('0')}];`],
      [null,       `    ${k('for')} (${k('int')} x : A) { mn=Math.min(mn,x); mx=Math.max(mx,x); }`],
      ['bucket',   `    ${k('int')}[] count = ${k('new int')}[mx-mn+${nm('1')}];`],
      ['bucket',   `    ${k('for')} (${k('int')} x : A) count[x-mn]++;`],
      [null,       `    ${k('int')} k = ${nm('0')};`],
      ['comparing',`    ${k('for')} (${k('int')} i=${nm('0')}; i<count.length; i++)`],
      ['comparing',`        ${k('while')} (count[i]-- > ${nm('0')}) A[k++] = i + mn;`],
      ['sorted',   `    ${cm('A is now sorted')}`],
      [null,       `}`],
    ],
    twopointers: [
      [null,       `${k('static int')}[] ${fn('twoPointers')}(${k('int')}[] A, ${k('int')} target) {`],
      [null,       `    Arrays.sort(A);`],
      [null,       `    ${k('int')} L = ${nm('0')}, R = A.length - ${nm('1')};`],
      ['leftptr',  `    ${k('while')} (L < R) {`],
      ['comparing',`        ${k('int')} s = A[L] + A[R];`],
      ['found',    `        ${k('if')} (s == target) ${k('return new int')}[]{L, R};`],
      ['leftptr',  `        ${k('if')} (s < target)  L++;  ${cm('need larger')}`],
      ['rightptr', `        ${k('else')}              R--;  ${cm('need smaller')}`],
      [null,       `    }`],
      [null,       `    ${k('return new int')}[]{-${nm('1')}, -${nm('1')}};`],
      [null,       `}`],
    ],
    slidingwindow: [
      [null,        `${k('static int')}[] ${fn('slidingWindow')}(${k('int')}[] A, ${k('int')} k) {`],
      ['window',    `    ${k('int')} winSum = ${nm('0')};`],
      ['window',    `    ${k('for')} (${k('int')} i=${nm('0')}; i<k; i++) winSum += A[i];`],
      [null,        `    ${k('int')} maxSum=winSum, maxStart=${nm('0')};`],
      ['comparing', `    ${k('for')} (${k('int')} i=k; i<A.length; i++) {`],
      ['comparing', `        winSum += A[i] - A[i-k];`],
      ['bestWindow',`        ${k('if')} (winSum > maxSum) {`],
      ['bestWindow',`            maxSum=winSum; maxStart=i-k+${nm('1')};`],
      [null,        `        }`],
      [null,        `    }`],
      [null,        `    ${k('return new int')}[]{maxSum, maxStart};`],
      [null,        `}`],
    ],
    linear: [
      [null,        `${k('static int')} ${fn('linearSearch')}(${k('int')}[] arr, ${k('int')} target) {`],
      ['current',   `    ${k('for')} (${k('int')} i=${nm('0')}; i<arr.length; i++) {`],
      ['current',   `        ${k('if')} (arr[i] == target)`],
      ['found',     `            ${k('return')} i;  ${cm('found at index i')}`],
      ['eliminated',`        ${cm('arr[i] != target, continue')}`],
      [null,        `    }`],
      [null,        `    ${k('return')} -${nm('1')};  ${cm('not found')}`],
      [null,        `}`],
    ],
    binary: [
      [null,        `${k('static int')} ${fn('binarySearch')}(${k('int')}[] arr, ${k('int')} target) {`],
      [null,        `    ${k('int')} L=${nm('0')}, R=arr.length-${nm('1')};`],
      ['mid',       `    ${k('while')} (L <= R) {`],
      ['mid',       `        ${k('int')} mid = (L + R) / ${nm('2')};`],
      ['found',     `        ${k('if')} (arr[mid] == target) ${k('return')} mid;`],
      ['left',      `        ${k('if')} (arr[mid] < target)  L = mid + ${nm('1')};`],
      ['right',     `        ${k('else')}                    R = mid - ${nm('1')};`],
      [null,        `    }`],
      [null,        `    ${k('return')} -${nm('1')};  ${cm('not found')}`],
      [null,        `}`],
    ],
  }
};

let currentLang = 'pseudo';

function buildCodePanel(a) {
  const lines = CODE_SNIPPETS[currentLang]?.[a];
  if (!lines) return;
  $('codePanelTitle').textContent = currentLang === 'pseudo' ? 'Pseudocode' : 'Code';
  const body = $('codeBody');
  body.innerHTML = '';
  lines.forEach(([id, text], i) => {
    const row = document.createElement('div');
    row.className = 'code-line';
    row.dataset.lineId = id || '';
    const lno = document.createElement('span');
    lno.className = 'code-lno';
    lno.textContent = i + 1;
    const txt = document.createElement('span');
    txt.className = 'code-text';
    txt.innerHTML = text;
    row.appendChild(lno);
    row.appendChild(txt);
    body.appendChild(row);
  });
}

document.querySelectorAll('.lang-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    buildCodePanel(algo);
    highlightCodeLine(null);
  });
});

function getStepLineId(step) {
  if (!step) return null;
  if (step.type === 'grid') {
    const st = step.state || {};
    if (st.found     !== undefined && st.found !== null) return 'found';
    if (st.mid       !== undefined && st.mid   !== null) return 'mid';
    if (st.current   !== undefined)                      return 'current';
    if (st.eliminated && st.eliminated.length)           return 'eliminated';
    if (st.left      !== undefined)                      return 'left';
    if (st.right     !== undefined)                      return 'right';
    return null;
  }
  const hl = step.hl || {};
  if (hl.found      && hl.found.length)      return 'found';
  if (hl.sorted     && hl.sorted.length)     return 'sorted';
  if (hl.swapping   && hl.swapping.length)   return 'swapping';
  if (hl.pivot      !== undefined)           return 'pivot';
  if (hl.bestWindow && hl.bestWindow.length) return 'bestWindow';
  if (hl.comparing  && hl.comparing.length)  return 'comparing';
  if (hl.current    !== undefined)           return 'current';
  if (hl.leftptr    !== undefined)           return 'leftptr';
  if (hl.rightptr   !== undefined)           return 'rightptr';
  if (hl.leftpart   && hl.leftpart.length)   return 'leftpart';
  if (hl.rightpart  && hl.rightpart.length)  return 'rightpart';
  if (hl.bucket     && hl.bucket.length)     return 'bucket';
  if (hl.window     && hl.window.length)     return 'window';
  if (hl.eliminated && hl.eliminated.length) return 'eliminated';
  return null;
}

function highlightCodeLine(lineId) {
  const rows = $('codeBody').querySelectorAll('.code-line');
  let hit = false;
  rows.forEach(row => {
    const match = lineId && row.dataset.lineId === lineId && !hit;
    row.classList.toggle('hl-active', match);
    if (match) {
      hit = true;
      row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
}

updateSidebar('bubble');
buildCodePanel('bubble');
speedVal.textContent     =SPEED_LABELS[speedSlider.value];
sizeVal.textContent      =sizeSlider.value;
windowSizeVal.textContent=windowSlider.value;
fullReset();
