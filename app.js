const dimensions = [
  {
    key: "positioning",
    name: "IP定位清晰度",
    questions: [
      "陌生人看完我的主页或朋友圈后，能在30秒内明白我具体帮助哪类人。",
      "我能清楚说出：我的目标客户正在经历什么痛苦，以及我能带她走向什么结果。",
      "我的内容不是泛泛而谈疗愈，而是围绕某一类具体人群的具体问题展开。",
      "我知道自己和其他疗愈师相比，最值得被客户选择的独特优势。",
      "如果有人问“你是做什么的”，我能用一句话讲清楚，而不是讲很多概念。"
    ]
  },
  {
    key: "content",
    name: "内容获客能力",
    questions: [
      "我发的内容能让目标客户产生“她说的就是我”的感觉。",
      "我的内容里不仅有疗愈感悟，也有客户痛点、案例、结果和行动建议。",
      "我知道哪些内容是用来建立信任，哪些内容是用来激发咨询。",
      "我现在每周至少能收到一些点赞、私信、咨询或转介绍。",
      "我知道如何把一个陌生人从看见我，引导到加微信或预约咨询。",
      "我不是想到什么发什么，而是有围绕变现目标设计的内容选题库。"
    ]
  },
  {
    key: "product",
    name: "产品变现系统",
    questions: [
      "我现在不是只卖单次咨询，而是有清晰的阶段性解决方案。",
      "我知道客户为什么愿意为一个长期疗愈陪跑方案付费，而不是只买一次体验。",
      "我的产品能让客户看见明确结果，而不是只描述疗愈过程。",
      "我有从低门槛体验到高客单陪跑的产品阶梯。",
      "我知道如何把自己的疗愈技术包装成客户听得懂、愿意买的解决方案。",
      "我能说清楚我的高客单产品适合谁、不适合谁。"
    ]
  },
  {
    key: "money",
    name: "成交与财富卡点",
    questions: [
      "当客户问价格时，我能稳定表达收费，而不是紧张、解释或立刻降价。",
      "我不会因为害怕客户拒绝，就不敢主动邀请对方进入诊断或长期方案。",
      "我能在咨询中挖掘客户真实问题，而不是只陪她聊情绪。",
      "我知道如何让客户看到“不解决这个问题会继续损失什么”。",
      "我内心相信自己的服务值得被认真付费，而不是总觉得“我还不够好”。",
      "当客户说“太贵了”时，我不会马上自我怀疑或否定自己的价值。",
      "我能区分“帮助客户”和“讨好客户”，不会用免费、多送、降价来换安全感。"
    ]
  },
  {
    key: "delivery",
    name: "交付与信任资产",
    questions: [
      "我有客户案例、反馈、见证或前后对比，可以证明我的服务价值。",
      "我的交付有基本流程，而不是每次都凭感觉临场发挥。",
      "我知道如何把客户的疗愈变化整理成可传播的案例故事。",
      "我的客户能清楚感受到每个阶段的变化，而不是只觉得“聊完舒服一点”。",
      "我有复盘、跟进、反馈机制，能支持客户持续行动。",
      "我知道如何把自己的经验沉淀成方法论，而不是永远靠个人状态交付。"
    ]
  },
  {
    key: "ai",
    name: "AI提效能力",
    questions: [
      "我已经开始用AI辅助生成内容选题、朋友圈文案或短视频脚本。",
      "我知道如何用AI整理客户画像、痛点语言和咨询记录。",
      "我能用AI辅助生成测评报告、个案复盘或交付资料。",
      "我不觉得AI会削弱疗愈的温度，而是认为它能帮我把更多精力留给客户。",
      "我愿意学习简单的AI工具，用来减少内容生产和交付整理的时间。",
      "我知道哪些事情应该交给AI提效，哪些事情必须保留疗愈师本人的深度陪伴。"
    ]
  }
];

let radarChart = null;

function renderQuestions() {
  const container = document.querySelector("#questions");
  let index = 0;

  dimensions.forEach((dimension) => {
    const title = document.createElement("h3");
    title.className = "dimension-title";
    title.textContent = dimension.name;
    container.appendChild(title);

    dimension.questions.forEach((question) => {
      index += 1;
      const block = document.createElement("div");
      block.className = "question";
      block.innerHTML = `
        <div>
          <strong>${index}. ${question}</strong>
          <div class="question-hint">（1 = 完全不符合，5 = 非常符合）</div>
        </div>
        <div class="options" role="radiogroup" aria-label="${question}">
          ${[1,2,3,4,5].map(value => `
            <label title="${value}分">
              <input type="radio" name="q${index}" value="${value}" ${value === 3 ? "checked" : ""} />
              <span>${value}</span>
            </label>
          `).join("")}
        </div>
      `;
      container.appendChild(block);
    });
  });
}

function getAnswers() {
  let index = 0;
  const scores = {};
  const maxScores = {};
  dimensions.forEach((dimension) => {
    scores[dimension.key] = 0;
    maxScores[dimension.key] = dimension.questions.length * 5;
    dimension.questions.forEach(() => {
      index += 1;
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      scores[dimension.key] += Number(selected?.value || 0);
    });
  });
  return { scores, maxScores };
}

function getPercentScores(scores, maxScores) {
  const result = {};
  Object.keys(scores).forEach(key => {
    result[key] = Math.round((scores[key] / maxScores[key]) * 100);
  });
  return result;
}

function getTotalScore(scores, maxScores) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const max = Object.values(maxScores).reduce((a, b) => a + b, 0);
  return Math.round((total / max) * 100);
}

function getReportType(totalScore) {
  if (totalScore <= 35) {
    return {
      name: "蓄能转型型",
      description: "你现在不是能力不行，而是还处在“从学习者到疗愈师IP”的身份切换期。你最需要的是完成个案积累、首单破冰和基础IP定位。"
    };
  }
  if (totalScore <= 55) {
    return {
      name: "线上起盘型",
      description: "你已经有一定疗愈基础，但线上商业系统还没有跑起来。你最需要的是定位、内容、引流、私域承接和诊断成交的SOP。"
    };
  }
  if (totalScore <= 75) {
    return {
      name: "低价穷忙型",
      description: "你已经开始变现，但可能陷入了“有客户、没利润、有咨询、没系统”的状态。你最需要的是产品升级、高客单成交和财富信念突破。"
    };
  }
  if (totalScore <= 90) {
    return {
      name: "高客单跃迁型",
      description: "你已经具备不错基础，但还需要把产品、内容、成交、交付和AI提效系统化，进入更稳定的高客单变现阶段。"
    };
  }
  return {
    name: "丰盛领航型",
    description: "你已经具备较强的IP商业化基础。下一步是放大个人方法论、优化产品矩阵、沉淀案例资产，并用AI提升系统效率。"
  };
}

function getLowestKeys(percentScores, count = 3) {
  return Object.entries(percentScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, count)
    .map(([key]) => key);
}

function getHighestKeys(percentScores, count = 3) {
  return Object.entries(percentScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => key);
}

const strengthMap = {
  positioning: "你的IP方向已经具备可被看见的基础，适合进一步把“我是谁”翻译成客户一眼能懂的结果表达。",
  content: "你已经具备内容表达和客户洞察能力，适合继续放大“让客户觉得你说的就是我”的内容获客力。",
  product: "你已经开始具备产品化意识，适合把单次咨询升级为更有结果感的阶段性解决方案。",
  money: "你在收费、成交和价值表达上已有一定稳定度，这是高客单转化的重要基础。",
  delivery: "你已经具备信任资产和交付沉淀的基础，适合把案例、见证和流程打造成高客单背书。",
  ai: "你愿意借助AI提升内容、运营和交付效率，这会让你在疗愈IP变现中少走很多弯路。"
};

const blockMap = {
  positioning: "IP定位还不够清晰：客户可能看不懂你到底帮助谁、解决什么具体问题、为什么值得选择你。",
  content: "内容获客偏弱：你可能发了很多内容，但没有持续制造“被看见、被理解、想咨询”的效果。",
  product: "产品系统不完整：如果只卖单次咨询，客户很难理解长期陪跑和高客单方案的价值。",
  money: "成交与财富卡点明显：你可能害怕报价、害怕被拒绝，甚至会用降价、多送服务来换安全感。",
  delivery: "信任资产不足：需要沉淀案例、见证、流程和结果表达，让客户更容易相信你能带来改变。",
  ai: "AI提效能力不足：你还没有用AI系统化辅助选题、报告、销售话术和交付资料。"
};

const actionMap = {
  positioning: "重新写出一句话定位：我帮助【哪类人】解决【什么痛点】，实现【什么结果】。",
  content: "建立30个内容选题，围绕“获客难、成交难、不敢收钱、高客单转型、AI提效”持续输出。",
  product: "设计产品阶梯：免费内容 → 低价测评/报告 → 60分钟诊断 → 90天/180天高客单陪跑。",
  money: "每天练习一次稳定报价表达，并记录自己在谈钱时出现的身体感受、念头和恐惧。",
  delivery: "整理3个客户案例或练习个案，把“过程体验”翻译成客户听得懂的“结果变化”。",
  ai: "先学会用AI做三件事：生成选题、改写朋友圈、根据测评答案生成个性化报告。"
};


function getActionReadiness(progressTimeline, coachingInterest, consultationWillingness) {
  let score = 0;

  if (progressTimeline === "30天内") score += 3;
  else if (progressTimeline === "90天内") score += 2;
  else if (progressTimeline === "半年内") score += 1;

  if (coachingInterest === "非常想，最近就在找人带") score += 3;
  else if (coachingInterest === "有兴趣，但想先了解") score += 2;
  else if (coachingInterest === "还在观望") score += 1;

  if (consultationWillingness === "愿意，想尽快了解") score += 3;
  else if (consultationWillingness === "可以先了解一下") score += 2;

  if (score >= 7) {
    return {
      level: "高行动准备度",
      description: "你已经不是单纯了解阶段，而是进入“需要明确路径和外部支持”的阶段。这个阶段最适合通过一次深度诊断，把90天内最该突破的卡点拆清楚。"
    };
  }

  if (score >= 4) {
    return {
      level: "中行动准备度",
      description: "你已经意识到问题存在，也开始考虑外部支持。接下来最重要的是先看清自己的优先级，不要同时想解决所有问题。"
    };
  }

  return {
    level: "观望准备度",
    description: "你目前更适合先看清自己的卡点和路径。如果报告中有内容让你明显共鸣，可以再进入深度诊断。"
  };
}

function getCoreBottleneck(lowestKeys, reportType) {
  const primary = lowestKeys[0];
  const map = {
    positioning: "你现在最大的瓶颈不是不会疗愈，而是客户还没有在第一时间看懂你到底帮助谁、解决什么问题、为什么值得被选择。定位不清，会直接影响内容、获客和成交。",
    content: "你现在最大的瓶颈不是没有能力，而是内容还没有承担“吸引精准客户”的功能。你可能在表达疗愈感悟，但客户没有被引导到“我需要找你聊一聊”。",
    product: "你现在最大的瓶颈是产品结构还不够结果化。如果继续只卖单次咨询，客户很难理解长期陪跑和高客单方案的价值，你也容易陷入低价穷忙。",
    money: "你现在最大的瓶颈是成交与财富关系卡点。你可能知道应该报价、邀约、推进方案，但一到真实谈钱场景，就会紧张、退缩、降价或多送服务。",
    delivery: "你现在最大的瓶颈是信任资产还没有系统沉淀。高客单不是靠硬卖，而是靠案例、见证、流程、方法论和客户结果共同建立信任。",
    ai: "你现在最大的瓶颈是效率系统不足。内容、复盘、报告、交付资料都靠自己硬扛，会让你越来越累，也很难稳定放大。"
  };

  return `${map[primary] || map.product} 从你的整体结果看，你属于「${reportType.name}」，接下来不适合继续泛泛学习，而应该先抓住最关键的商业瓶颈做突破。`;
}

function getNinetyDayPath(reportType, stage, lowestKeys) {
  if (reportType.name === "蓄能转型型" || stage.includes("职场")) {
    return [
      "第1阶段：完成疗愈师IP基础定位，明确你帮助哪类人解决什么问题。",
      "第2阶段：围绕目标客户痛点完成个案练习、反馈收集和信任素材沉淀。",
      "第3阶段：设计低门槛诊断产品，完成首批私域邀约和首单破冰。",
      "第4阶段：复盘成交卡点，清理“不敢收钱、不敢开始、不敢表达自己”的财富关系阻抗。"
    ];
  }

  if (stage.includes("线下")) {
    return [
      "第1阶段：把线下口碑和疗愈能力翻译成线上客户能看懂的IP定位。",
      "第2阶段：搭建朋友圈/小红书/视频号内容获客选题库，让内容开始承接咨询。",
      "第3阶段：设计低门槛测评或诊断产品，建立从内容到私域的承接路径。",
      "第4阶段：搭建首次高客单转化流程，把线下能力升级成线上解决方案。"
    ];
  }

  if (reportType.name === "低价穷忙型" || stage.includes("低客单")) {
    return [
      "第1阶段：重塑高客单客户画像，筛掉只想低价体验、不愿意为结果付费的人。",
      "第2阶段：把单次咨询升级成3个月结果型陪跑方案，明确阶段目标和交付路径。",
      "第3阶段：设计高客单诊断流程和成交表达，让客户看见“不解决会继续损失什么”。",
      "第4阶段：清理“不敢涨价、不敢成交、害怕被拒绝”的财富卡点，稳定承接高价。"
    ];
  }

  return [
    "第1阶段：重新梳理高客单定位和核心方法论，让客户快速理解你的独特价值。",
    "第2阶段：升级内容矩阵，围绕高净值客户痛点输出更有结果感的内容。",
    "第3阶段：优化产品阶梯和诊断成交流程，提高从咨询到陪跑的转化率。",
    "第4阶段：用AI搭建内容库、客户分析库、销售话术库和交付资料库，提升系统效率。"
  ];
}

function getWhySupport(lowestKeys) {
  const dimensionNames = lowestKeys.map(key => dimensions.find(d => d.key === key)?.name).filter(Boolean).join("、");
  return `你现在的问题很难只靠自己刷课或反复琢磨解决，因为它不是单一技巧问题，而是「${dimensionNames}」几个系统同时卡住：外在商业系统不清晰，会让你不知道怎么定位、获客和设计产品；内在财富关系有阻抗，会让你明明知道该报价，却在真实场景里退缩；执行效率不足，又会让你想做内容、做产品、做交付，却总是被时间和情绪消耗拖住。所以你需要的不是单点技巧，而是一套“财富卡点清理 + 商业系统搭建 + AI提效”的三维陪跑。`;
}

function openQrModal() {
  const modal = document.querySelector("#qrModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  }
}

function closeQrModal() {
  const modal = document.querySelector("#qrModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeQrModal();
  }
});

function renderList(id, items) {
  const el = document.querySelector(id);
  el.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

function createRadarChart(percentScores) {
  const ctx = document.querySelector("#radarChart");

  if (radarChart) {
    radarChart.destroy();
  }

  radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "IP定位清晰度",
        ["内容获客", "能力"],
        ["产品变现", "系统"],
        ["成交与财富", "卡点"],
        ["交付与信任", "资产"],
        ["AI提效", "能力"]
      ],
      datasets: [{
        label: "当前能力得分",
        data: dimensions.map(d => percentScores[d.key]),
        fill: true,
        borderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 },
          pointLabels: { font: { size: 11 } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function generateReport(event) {
  event.preventDefault();

  const { scores, maxScores } = getAnswers();
  const percentScores = getPercentScores(scores, maxScores);
  const totalScore = getTotalScore(scores, maxScores);
  const reportType = getReportType(totalScore);
  const lowest = getLowestKeys(percentScores);
  const highest = getHighestKeys(percentScores);

  const name = document.querySelector("#name").value.trim() || "疗愈师伙伴";
  const contact = document.querySelector("#contact").value.trim() || "未填写";
  const stage = document.querySelector("#stage").value;
  const income = document.querySelector("#income").value;
  const mainPain = document.querySelector("#mainPain").value;
  const progressTimeline = document.querySelector("#progressTimeline")?.value || "未填写";
  const coachingInterest = document.querySelector("#coachingInterest")?.value || "未填写";
  const investmentFocus = document.querySelector("#investmentFocus")?.value || "未填写";
  const consultationWillingness = document.querySelector("#consultationWillingness")?.value || "未填写";
  const urgentProblem = document.querySelector("#urgentProblem")?.value?.trim() || "未填写";

  const readiness = getActionReadiness(progressTimeline, coachingInterest, consultationWillingness);

  document.querySelector("#totalScore").textContent = totalScore;
  document.querySelector("#reportTitle").textContent = `${name}的高客单变现诊断报告`;
  document.querySelector("#reportSummary").textContent =
    `你的当前类型是「${reportType.name}」。你最需要优先突破的是：${lowest.map(key => dimensions.find(d => d.key === key).name).join("、")}。`;

  document.querySelector("#basicInfo").innerHTML = `
    <p><strong>姓名/昵称：</strong>${name}</p>
    <p><strong>联系方式：</strong>${contact}</p>
    <p><strong>当前状态：</strong>${stage}</p>
    <p><strong>月收入：</strong>${income}</p>
    <p><strong>最想解决：</strong>${mainPain}</p>
    <p><strong>最希望被帮助解决：</strong>${urgentProblem}</p>
    <hr />
    <p><strong>希望看到进展：</strong>${progressTimeline}</p>
    <p><strong>90天路径意愿：</strong>${coachingInterest}</p>
    <p><strong>最愿意投资：</strong>${investmentFocus}</p>
    <p><strong>深度诊断意愿：</strong>${consultationWillingness}</p>
  `;

  document.querySelector("#typeBadge").textContent = reportType.name;
  document.querySelector("#typeDescription").textContent = reportType.description;
  document.querySelector("#readinessBadge").textContent = readiness.level;
  document.querySelector("#readinessDescription").textContent = readiness.description;

  renderList("#strengths", highest.map(key => strengthMap[key]));
  renderList("#blocks", lowest.map(key => blockMap[key]));
  renderList("#actions", lowest.map(key => actionMap[key]));
  renderList("#ninetyDayPath", getNinetyDayPath(reportType, stage, lowest));

  document.querySelector("#coreBottleneck").textContent = getCoreBottleneck(lowest, reportType);
  document.querySelector("#whySupport").textContent = getWhySupport(lowest);

  createRadarChart(percentScores);

  document.querySelector("#reportSection").classList.remove("hidden");
  document.querySelector("#reportSection").scrollIntoView({ behavior: "smooth" });

  localStorage.setItem("healerIpAssessmentLastResult", JSON.stringify({
    name, contact, stage, income, mainPain, urgentProblem, progressTimeline, coachingInterest, investmentFocus,
    consultationWillingness, readiness, totalScore, percentScores, reportType
  }));
}

function safeFileName(text) {
  return String(text || "healer-ip-report")
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 40) || "healer-ip-report";
}

async function downloadReportImage(button) {
  const reportContainer = document.querySelector("#reportSection .container");
  if (!reportContainer) {
    alert("还没有生成报告，请先完成测评。");
    return;
  }

  if (typeof html2canvas === "undefined") {
    alert("报告下载组件还没有加载完成，请刷新页面后再试。");
    return;
  }

  const hiddenItems = document.querySelectorAll(".report-download-hide");
  const originalDisplays = Array.from(hiddenItems).map(item => item.style.display);

  const originalText = button ? button.textContent : "";
  if (button) {
    button.disabled = true;
    button.textContent = "正在生成图片...";
  }

  try {
    hiddenItems.forEach(item => {
      item.style.display = "none";
    });

    await new Promise(resolve => setTimeout(resolve, 120));

    const canvas = await html2canvas(reportContainer, {
      backgroundColor: "#fbf7f0",
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY
    });

    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png", 1));
    if (!blob) {
      throw new Error("图片生成失败");
    }

    const name = document.querySelector("#name")?.value?.trim() || "高客单变现诊断报告";
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFileName(name)}-高客单变现诊断报告.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error(error);
    alert("报告图片生成失败，请稍后再试，或更换浏览器打开。");
  } finally {
    hiddenItems.forEach((item, index) => {
      item.style.display = originalDisplays[index];
    });
    if (button) {
      button.disabled = false;
      button.textContent = originalText || "下载报告图片";
    }
  }
}

function restartAssessment() {
  document.querySelector("#reportSection").classList.add("hidden");
  document.querySelector("#assessment").scrollIntoView({ behavior: "smooth" });
}

renderQuestions();
document.querySelector("#assessmentForm").addEventListener("submit", generateReport);
