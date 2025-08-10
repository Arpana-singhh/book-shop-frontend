import { Modal, Button } from "antd";

const ConfirmModal = ({
  open,
  title = "🗑️ Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onCancel,
  onConfirm,
  confirmText = "Yes",
  cancelText = "No"
}) => {
  return (
    <Modal
      open={open}
      title={
        <div className="text-[20px] font-bold text-[#393280] border-b pb-2">
          {title}
        </div>
      }
      onCancel={onCancel}
      footer={null}
    >
      <p className="text-[#232323] text-[16px] mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button
          onClick={onCancel}
          className="border border-primary rounded-[5px] text-primary bg-transparent min-w-[100px] transition-all duration-300 hover:!bg-primary hover:!text-white hover:!border-primary"
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          className="border border-primary bg-primary rounded-[5px] text-white min-w-[100px] transition-all duration-300 hover:!bg-transparent hover:!text-primary hover:!border-primary"
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
