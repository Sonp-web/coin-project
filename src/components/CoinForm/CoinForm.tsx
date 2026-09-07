import { Form, InputNumber, Button } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addCoin } from "../../redux/slices/portfolioSlice";
import { useParams } from "react-router-dom";

type FieldType = {
  count: number;
};
type CoinFormProps = {
  buyingPrice: number;
};
export const CoinForm: React.FC<CoinFormProps> = ({ buyingPrice }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (params.id) {
      dispatch(
        addCoin({
          id: params.id,
          count: values.count,
          buyingPrice: buyingPrice,
        }),
      );
    }
  };
  return (
    <Form
      layout="vertical"
      className="add-coin-modal-form"
      onFinish={onFinish}
      initialValues={{ count: 0 }}
    >
      <Form.Item
        name="count"
        label="Введите количество:"
        rules={[
          { required: true, message: "Please input count!" },
          {
            validator: (_, value) =>
              value > 0
                ? Promise.resolve()
                : Promise.reject(new Error("Количество должно быть больше 0")),
          },
        ]}
      >
        <InputNumber min={0} step={0.1} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Добавить
      </Button>
    </Form>
  );
};
