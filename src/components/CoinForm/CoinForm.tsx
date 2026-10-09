import { Form, InputNumber, Button } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addCoin } from "../../redux/slices/portfolioSlice";
import "./CoinForm.css";
import { formatPrice } from "../../utils/formatPrice";
type FieldType = {
  count: number;
};
type CoinFormProps = {
  buyingPrice: number;
  id: string;
  onCancel?: () => void;
};
export const CoinForm: React.FC<CoinFormProps> = ({
  id,
  buyingPrice,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<FieldType>();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(
      addCoin({
        id: id,
        count: values.count,
        buyingPrice: buyingPrice,
      }),
    );
    form.resetFields();
  };
  const count = Form.useWatch("count", form);
  const endValue = (count ?? 0) * buyingPrice;
  return (
    <Form
      form={form}
      layout="vertical"
      className="coin-form-add"
      onFinish={onFinish}
      initialValues={{ count: 0 }}
    >
      <Form.Item
        name="count"
        label="Количество"
        className="coin-form-add-label"
        extra={<p className="coin-form-add-input-descr">Больше 0, шаг 0,1</p>}
        rules={[
          { required: true, message: "Пожалуйста введите число!" },
          {
            validator: (_, value) =>
              value > 0
                ? Promise.resolve()
                : Promise.reject(new Error("Количество должно быть больше 0")),
          },
        ]}
      >
        <InputNumber className="coin-form-add-input" min={0} step={0.1} />
      </Form.Item>
      <div className="coin-form-add-price">
        <p className="coin-form-add-price-descr">Итого</p>
        <p className="coin-form-add-price-value">{formatPrice(endValue)} $</p>
      </div>
      <div className="coin-form-add-buttons">
        {onCancel ? (
          <Button
            onClick={onCancel}
            type="primary"
            className="coin-form-add-button coin-form-add-button-cancel"
          >
            Отмена
          </Button>
        ) : null}
        <Button
          htmlType="submit"
          type="primary"
          className="coin-form-add-button"
        >
          Добавить
        </Button>
      </div>
    </Form>
  );
};
