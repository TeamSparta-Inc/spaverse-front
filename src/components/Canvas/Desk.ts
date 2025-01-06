import { Graphics, Text, FederatedPointerEvent } from "pixi.js";
import { Desk } from "../../models/desk";
import { snapToGrid } from "../../utils/grid";

export class DeskGraphics extends Graphics {
  private nameText: Text;
  private isDragging: boolean = false;
  private dragData: FederatedPointerEvent | null = null;
  private dragStartPosition = { x: 0, y: 0 };

  constructor(desk: Desk, onPositionUpdate?: (x: number, y: number) => void) {
    super();

    // 책상 그리기
    this.beginFill(0xcccccc);
    this.lineStyle(2, 0x666666);
    this.drawRect(0, 0, desk.width, desk.height);
    this.endFill();

    // 이름 텍스트 추가
    this.nameText = new Text(desk.name, {
      fontSize: 12,
      fill: 0x000000,
      align: "center",
    });
    this.nameText.position.set(
      desk.width / 2 - this.nameText.width / 2,
      desk.height / 2 - this.nameText.height / 2
    );
    this.addChild(this.nameText);

    // 위치 설정
    this.position.set(desk.x, desk.y);

    // 드래그 가능하도록 설정
    this.eventMode = "static";
    this.cursor = "pointer";

    // 드래그 이벤트 설정
    this.on("pointerdown", this.onDragStart)
      .on("pointerup", this.onDragEnd)
      .on("pointerupoutside", this.onDragEnd)
      .on("pointermove", this.onDragMove);
  }

  private onDragStart = (event: FederatedPointerEvent) => {
    this.isDragging = true;
    this.dragData = event;
    this.alpha = 0.8;
    this.dragStartPosition = {
      x: this.position.x,
      y: this.position.y,
    };
  };

  private onDragEnd = () => {
    this.isDragging = false;
    this.dragData = null;
    this.alpha = 1;

    // 그리드에 스냅
    const { x, y } = snapToGrid(this.position.x, this.position.y);
    this.position.set(x, y);
  };

  private onDragMove = (event: FederatedPointerEvent) => {
    if (!this.isDragging || !this.dragData) return;

    const newPosition = event.getLocalPosition(this.parent);
    this.position.set(newPosition.x, newPosition.y);
  };

  updateName(name: string) {
    this.nameText.text = name;
    this.nameText.position.set(
      this.width / 2 - this.nameText.width / 2,
      this.height / 2 - this.nameText.height / 2
    );
  }
}
