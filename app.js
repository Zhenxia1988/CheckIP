const dimensions = [
  {
    key: "positioning",
    name: "IP定位清晰度",
    questions: [
      "我非常清楚自己最想服务哪一类人。",
      "我能用一句话说清楚：我帮助谁，解决什么问题，带来什么结果。",
      "我的疗愈方法、个人经历和客户痛点之间有清晰连接。",
      "别人看到我的主页或朋友圈，可以快速知道我擅长什么。",
      "我知道自己和其他疗愈师相比，最独特的优势是什么。"
    ]
  },
  {
    key: "content",
    name: "内容获客能力",
    questions: [
      "我有稳定的内容输出习惯，比如朋友圈、小红书、视频号或公众号。",
      "我知道目标客户每天在焦虑什么、渴望什么、害怕什么。",
      "我的内容不是单纯分享知识，而是能激发客户咨询欲望。",
      "我知道如何通过内容建立信任，而不是只发疗愈感悟。",
      "我现在已经能通过公域或私域获得一些主动咨询。",
      "我知道如何设计引流品，把陌生人转化为潜在客户。"
    ]
  },
  {
    key: "product",
    name: "产品变现系统",
    questions: [
      "我已经有清晰的产品阶梯，比如免费内容、低价测评、诊断咨询、高客单陪跑。",
      "我知道自己的高客单产品到底解决客户什么核心问题。",
      "我不是只卖单次疗愈，而是能设计一套阶段性解决方案。",
      "我知道如何把自己的疗愈技术包装成客户愿意付费的结果。",
      "我有清晰的客户路径：从看到我、信任我、咨询我，到购买我。"
    ]
  },
  {
    key: "money",
    name: "成交与财富卡点",
    questions: [
      "当客户问价格时，我可以自然、稳定地表达自己的收费。",
      "我不会因为客户犹豫，就立刻降价或免费多送很多服务。",
      "我内心相信自己的疗愈服务值得被高价购买。",
      "我敢于主动邀请客户进入咨询或诊断，而不是被动等待。",
      "我知道如何在咨询中挖掘客户真实痛点，并引导她看到解决方案的价值。",
      "我面对拒绝时，不会立刻怀疑自己“不够好”或“不配收钱”。"
    ]
  },
  {
    key: "delivery",
    name: "交付与信任资产",
    questions: [
      "我已经积累了一定数量的个案经验或客户反馈。",
      "我有客户见证、案例故事或前后对比，可以证明我的服务价值。",
      "我的交付不是临场发挥，而是有基本流程和框架。",
      "我知道如何跟进客户，让客户在服务过程中持续看到变化。",
      "我能够把疗愈体验转化成客户听得懂的结果语言。"
    ]
  },
  {
    key: "ai",
    name: "AI提效能力",
    questions: [
      "我已经开始用AI辅助写内容、整理客户画像或设计产品。",
      "我知道如何用AI生成测评、报告、朋友圈选题或销售文案。",
      "我不觉得AI会破坏疗愈的温度，反而认为它可以帮我释放更多精力。",
      "我愿意学习简单的AI工具，用来提升内容、获客和交付效率。"
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
          <div class="muted">1 = 完全不符合，5 = 非常符合</div>
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
  positioning: "你已经开始形成自己的IP方向，具备从“泛疗愈”走向“精准定位”的基础。",
  content: "你有一定内容表达与客户洞察能力，适合继续放大公域和私域获客。",
  product: "你对产品和变现路径已有意识，适合进一步设计阶梯式高客单方案。",
  money: "你在收费、成交和价值表达上已有一定稳定度，这是高客单转化的重要基础。",
  delivery: "你有疗愈交付能力和信任资产，适合把个案成果转化成案例、见证和方法论。",
  ai: "你愿意借助AI提升效率，这会让你在内容、交付和运营上少走很多弯路。"
};

const blockMap = {
  positioning: "IP定位还不够清晰：客户可能看不懂你到底服务谁、解决什么问题、为什么选择你。",
  content: "内容获客偏弱：你可能发了很多内容，但没有持续吸引精准客户主动咨询。",
  product: "产品系统不完整：如果只卖单次咨询，客户很难理解长期陪跑和高客单方案的价值。",
  money: "成交与财富卡点明显：你可能害怕报价、害怕被拒绝，甚至会用降价或多送服务换安全感。",
  delivery: "交付与信任资产不足：需要沉淀个案、见证、流程和结果表达，让客户更容易信任你。",
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
      labels: dimensions.map(d => d.name),
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
          pointLabels: { font: { size: 13 } }
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

  document.querySelector("#totalScore").textContent = totalScore;
  document.querySelector("#reportTitle").textContent = `${name}的疗愈师IP线上变现现状报告`;
  document.querySelector("#reportSummary").textContent =
    `你的当前类型是「${reportType.name}」。你最需要关注的是：${lowest.map(key => dimensions.find(d => d.key === key).name).join("、")}。`;

  document.querySelector("#basicInfo").innerHTML = `
    <p><strong>姓名/昵称：</strong>${name}</p>
    <p><strong>联系方式：</strong>${contact}</p>
    <p><strong>当前状态：</strong>${stage}</p>
    <p><strong>月收入：</strong>${income}</p>
    <p><strong>最想解决：</strong>${mainPain}</p>
  `;

  document.querySelector("#typeBadge").textContent = reportType.name;
  document.querySelector("#typeDescription").textContent = reportType.description;

  renderList("#strengths", highest.map(key => strengthMap[key]));
  renderList("#blocks", lowest.map(key => blockMap[key]));
  renderList("#actions", lowest.map(key => actionMap[key]));

  createRadarChart(percentScores);

  document.querySelector("#reportSection").classList.remove("hidden");
  document.querySelector("#reportSection").scrollIntoView({ behavior: "smooth" });

  localStorage.setItem("healerIpAssessmentLastResult", JSON.stringify({
    name, contact, stage, income, mainPain, totalScore, percentScores, reportType
  }));
}

function restartAssessment() {
  document.querySelector("#reportSection").classList.add("hidden");
  document.querySelector("#assessment").scrollIntoView({ behavior: "smooth" });
}

renderQuestions();
document.querySelector("#assessmentForm").addEventListener("submit", generateReport);
