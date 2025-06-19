import { Request, Response } from "express";

//Sau khi vẽ json dưới dạng n-ary tree thì em nhận ra có thể dùng dfs để build lại thành các tag mjml
//Dùng dfs postorder vì cần visit cái nốt con nằm xa gốc nhất để build children rồi mới lên chỗ nốt cha để build wrapper tags.
//Nhưng mà không biết cái này cover được hết các TH không.
const jsonToMjmlMarkup = (jsonData: any): string => {
  //Hàm helper đệ quy
  const convertElement = (element: any): string => {
    //Base case
    if (!element.tagName) {
      return "";
    }

    //Base case. Nếu là tagName Content thì trả về luôn <openTag>content</closeTag>
    if (element.content) {
      const { tagName, attributes = {}, content } = element;

      //Nối hết key vào attributes thì chuyen về string
      const attributesStr = Object.keys(attributes)
        .map((key) => `${key}="${attributes[key]}"`)
        .join(" ");

      const openTag = attributesStr
        ? `<${tagName} ${attributesStr}>`
        : `<${tagName}>`;

      const closeTag = `</${tagName}>`;
      return openTag + content + closeTag;
    }

    const { tagName, attributes = {}, children = [] } = element;

    //Nối hết key trong attributes dictionary vào để nối thành string
    const attributesStr = Object.keys(attributes)
      .map((key) => `${key}="${attributes[key]}"`)
      .join(" ");

    const openTag = attributesStr
      ? `<${tagName} ${attributesStr}>`
      : `<${tagName}>`;

    const closeTag = `</${tagName}>`;

    // dfs traversal postorder. Cứ build dần node xa nhất = children rồi đến node cha làm wrapper bên ngoài
    const childrenStr = Array.isArray(children)
      ? children.map((child) => convertElement(child)).join("")
      : typeof children === "string"
      ? children
      : "";

    return `${openTag}${childrenStr}${closeTag}`;
  };

  //Bắt đầu gọi recursive function ở đây
  //Json data mà là mảng thì loop convert từng cái thôi. TH nhiều root. Khả năng không xảy ra vì có một thẻ mjml duy nhất bao ngoài
  if (Array.isArray(jsonData)) {
    return jsonData.map((element) => convertElement(element)).join("");
  }

  return convertElement(jsonData); // Ở đây chỉ có lẻ một json dât thì mình convert luôn
};

const JsonToMjmlController = {
  translate: async (req: Request, res: Response) => {
    try {
      const mjmlMarkup = jsonToMjmlMarkup(req.body.json);

      // It's cleaning time after playing kids. Do your chore.
      const singleLineMjml = mjmlMarkup
        .replace(/(\r\n|\n|\r)/g, "")
        .replace(/\\/g, "");
      console.log(singleLineMjml);

      res.json({ code: 200, mjml: singleLineMjml });
    } catch (e: any) {
      res.status(500).json({ code: 500, error: e.message });
    }
  },
};

export default JsonToMjmlController;
